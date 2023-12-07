import {
  GoogleMap,
  useLoadScript,
  Marker,
  OverlayView,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import MapContainer from "./MapContainer";
import axios from "axios";
import FilterHuntFom from "./FilterHuntFom";
import Modal from "./components/Modal";
import CluesQuestionnaire from "./CluesQuestionnaire";

function Map(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDsPBdXF3GQK7HNVEn_f_pfdlJh7VINw3A",
  });
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <MapContainer
      newUser={props.newUser}
      charecterCreation={props.charecterCreation}
      dispatchFn={props.dispatchFn}
    >
      <RenderMap
        charecterCreation={props.charecterCreation}
        dispatchFn={props.dispatchFn}
      />
    </MapContainer>
  );
}

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
};

function RenderMap(props) {
  const [scavengerStops, setScavengerStops] = useState([]);
  const [directTo, setDirectTo] = useState([]);
  const [loc, setLoc] = useState({
    coords: { latitude: 40.744838, longitude: -74.025683 },
  });
  const [resetView, setResetView] = useState(true);
  const [userHunts, setUserHunts] = useState([]);
  const [directions, setDirections] = useState(null);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [openClue, setOPenClue] = useState(false);
  const [clueQuesAns, setClueQuesAns] = useState({});
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${props.charecterCreation.userToken}`,
      "Content-Type": "application/json",
    };

    let query = "";
    props.charecterCreation.scavengerIntrests.forEach((topic, index) => {
      if (index === props.charecterCreation.scavengerIntrests.length - 1) {
        query += `topic=${topic}`;
      } else {
        query += `topic=${topic}&`;
      }
    });

    (async () => {
      const huntLocations = await axios.get(
        `http://127.0.0.1:3000/api/v1/scavengerHunt?${query}`,
        {
          headers,
        }
      );
      setUserHunts(huntLocations.data.data.hunts);
    })();
  }, [
    props.charecterCreation.userToken,
    props.charecterCreation.scavengerIntrests,
  ]);

  useEffect(() => {
    const successCallback = (position) => {
      setLoc(position);
    };

    const errorCallback = (error) => {
      // console.log(error);
    };

    const geoWatcher = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(geoWatcher);
    };
  }, []);

  useEffect(() => {
    console.log(directions);
    if (directTo && loc.coords.latitude && loc.coords.longitude) {
      const directionsServiceOptions = {
        destination: { lat: directTo[1], lng: directTo[0] },
        origin: { lat: loc.coords.latitude, lng: loc.coords.longitude },
        travelMode: "WALKING",
      };

      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(directionsServiceOptions, (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      });
    }
  }, [directTo]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setResetView(true);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [directTo]);

  return (
    <div style={{ position: "relative" }}>
      <GoogleMap
        zoom={16.8}
        center={{ lat: loc.coords.latitude, lng: loc.coords.longitude }}
        mapContainerClassName="display-map"
        options={{
          mapId: "c6341e5cd2c8ccc4",
          disableDefaultUI: true,
          tilt: !resetView ? null : 60,
          heading: 10,
          minZoom: !resetView ? null : 16.5,
          maxZoom: !resetView ? null : 16.5,
        }}
      >
        {scavengerStops.length === 0 &&
          userHunts.map((huntLocations) => {
            return (
              <Marker
                onClick={() => {
                  setScavengerStops(huntLocations.scavengerStops);
                }}
                key={huntLocations._id}
                position={{
                  lat: huntLocations.startLocation.coordinates[1],
                  lng: huntLocations.startLocation.coordinates[0],
                }}
              />
            );
          })}

        {scavengerStops.length !== 0 &&
          scavengerStops.map((huntLocations) => {
            // console.log(huntLocations);
            return (
              <Marker
                icon={{
                  url: "../public/huntStops.gif",
                  scaledSize: new window.google.maps.Size(70, 70),
                }}
                key={huntLocations._id}
                position={{
                  lat: huntLocations.coordinates[1],
                  lng: huntLocations.coordinates[0],
                }}
                onClick={() => {
                  setDirectTo(huntLocations.coordinates);
                  setOPenClue((s) => !s);
                  setClueQuesAns((s) => {
                    return {
                      ques: huntLocations.clue,
                      ans: huntLocations.solution,
                    };
                  });
                }}
              />
            );
          })}

        <OverlayView
          position={{ lat: loc.coords.latitude, lng: loc.coords.longitude }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="testing">
            <img src="../public/Charecter.gif" alt="charecter walking" />
          </div>
        </OverlayView>
        {directTo && (
          <>
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#ff0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                  },
                  preserveViewport: resetView,
                }}
              />
            )}
          </>
        )}
      </GoogleMap>

      {
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            backgroundColor: "rgba(255,255,255,0.7)",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {scavengerStops.length !== 0 && (
            <>
              <h3>Pick a clue to begin</h3>
              {scavengerStops.map((stops, i) => {
                return (
                  <p
                    onClick={() => {
                      setDirectTo(stops.coordinates);
                      setResetView(false);
                      console.log(`You clicked ${stops.scavengerName}`);
                    }}
                  >
                    {/* {stops.scavengerName} */}
                    {` Clue ${i + 1}`}
                  </p>
                );
              })}
            </>
          )}
          {scavengerStops.length === 0 && (
            <>
              <h3>Choose a Scavenger to get started</h3>
              {userHunts.map((item) => {
                return (
                  <p
                    onClick={() => {
                      setScavengerStops(item.scavengerStops);
                    }}
                  >
                    {item.scavengerName}
                  </p>
                );
              })}
            </>
          )}
        </div>
      }

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          backgroundColor: "rgba(255,255,255,0.7)",
          padding: "20px",
          borderRadius: "50%",
          height: "25px",
          width: "25px",
        }}
      >
        <i
          onClick={() => {
            setShowFilterForm((s) => !s);
          }}
        >
          Filter
        </i>
      </div>
      {showFilterForm && (
        <FilterHuntFom
          charecterCreation={props.charecterCreation}
          dispatchFn={props.dispatchFn}
        />
      )}

      {openClue && (
        <CluesQuestionnaire
          clue={clueQuesAns}
          charecterCreation={props.charecterCreation}
          dispatchFn={props.dispatchFn}
        />
      )}
    </div>
  );
}

export default Map;

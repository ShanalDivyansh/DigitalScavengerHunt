import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { RandomAvatar } from "react-random-avatars";
import axios from "axios";

function FilterHuntFom(props) {
  const [allHunts, setAllHunts] = useState([]);
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    (async () => {
      const headers = {
        Authorization: `Bearer ${props.charecterCreation.userToken}`,
        "Content-Type": "application/json",
      };
      const huntsData = await axios.get(
        `http://127.0.0.1:3000/api/v1/scavengerHunt`,
        {
          headers,
        }
      );
      const hunts = [];
      const topics = [];
      for (let h of huntsData.data.data.hunts) {
        if (!topics.includes(h.topic)) {
          hunts.push(h);
          topics.push(h.topic);
        }
      }
      const formSelection = hunts.map((hunt) => {
        return { ...hunt, selected: false };
      });
      setAllHunts((s) => {
        return formSelection;
      });
    })();
  }, []);
  function handleChange(e) {
    setAllHunts((state) => {
      return state.map((hunt) => {
        if (hunt._id === e.target.id) {
          return { ...hunt, selected: e.target.checked };
        } else {
          return { ...hunt };
        }
      });
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${props.charecterCreation.userToken}`,
        "Content-Type": "application/json",
      };
      const interests = allHunts.filter((selectedHunt) => {
        return selectedHunt.selected === true;
      });
      const topics = [];
      for (let h of interests) {
        topics.push(h.topic);
      }
      const data = await axios.patch(
        `http://127.0.0.1:3000/api/v1/users/${props.charecterCreation.id}`,
        { scavengerIntrests: topics },
        { headers }
      );
      props.dispatchFn({
        type: "setInterest",
        payload: { scavengerIntrests: topics },
      });
      setShowModal((s) => !s);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {showModal && (
        <Modal escape={false}>
          <RandomAvatar name={props.charecterCreation.userName} size={40} />
          <p>{props.charecterCreation.userName}</p>
          <p>Choose your interests...</p>
          <form onSubmit={handleSubmit}>
            {allHunts.map((hunt) => {
              return (
                <div key={`${hunt._id}`}>
                  <label className="checkBox-label" htmlFor={`${hunt._id}`}>
                    {`${hunt.topic}`}
                    <input
                      type="checkbox"
                      className="checkBox-right-align"
                      id={`${hunt._id}`}
                      checked={hunt.selected}
                      onChange={handleChange}
                      name={`${hunt.topic}`}
                    />
                  </label>
                </div>
              );
            })}
            <button>Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default FilterHuntFom;

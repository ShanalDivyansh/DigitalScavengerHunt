import { useState, useEffect, useReducer } from "react";
import LandingPage from "./LandingPage";
import Map from "./Map";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import axios from "axios";

const initialState = {
  loggedIn: false,
  userName: null,
  rewards: 0,
  scavengerIntrests: null,
  newUser: false,
  userToken: null,
  id: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loggedIn":
      if (action.payload.userName && !action.payload.newUser) {
        return {
          ...state,
          loggedIn: true,
          userName: action.payload.userName,
          rewards: action.payload.rewardsCollected,
          scavengerIntrests: action.payload.scavengerIntrests,
          userToken: action.payload.userToken,
          id: action.payload.id,
        };
      }
      if (action.payload.newUser) {
        return {
          ...state,
          newUser: action.payload.newUser,
          loggedIn: true,
          userName: action.payload.userName,
          rewards: Number.parseInt(action.payload.rewardsCollected),
          scavengerIntrests: action.payload.scavengerIntrests,
          userToken: action.payload.userToken,
          id: action.payload.id,
        };
      }
      break;
    case "setInterest":
      return {
        ...state,
        scavengerIntrests: action.payload.scavengerIntrests,
      };
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      {!state.loggedIn && <LandingPage loggedIn={dispatch} />}
      {state.loggedIn && (
        <Map
          newUser={state.newUser}
          charecterCreation={state}
          dispatchFn={dispatch}
        />
      )}
    </>
  );
};
export default App;

// const [isValidLogin, setValidLogin] = useState(false);
// const [isValidSignUp, setValidSignup] = useState(false);
// const [currentPage, setCurrentPage] = useState('landing');
// const [resetToken, setResetToken] = useState(null);
// // Effect to check for the reset password token in the URL
// useEffect(() => {
//   const path = window.location.pathname;
//   if (path.includes('/resetPassword/')) {
//     const token = path.split('/resetPassword/')[1];
//     if (token) {
//       setResetToken(token);
//       setCurrentPage('resetPassword');
//     }else {
//       setCurrentPage('landing');
//       window.history.pushState({}, '', '/');
//     }
//   }
// }, []);

// function handleLogin() {
//   setValidLogin(true);
// }
// function handleSignup() {
//   setValidSignup(true);
// }
// function handleForgotPassword() {
//   setCurrentPage('forgotPassword');
// }

// function handleResetPassword(token) {
//   setCurrentPage('resetPassword');
// }
// function onResetSuccess() {
//   setCurrentPage('landing');
//   window.history.pushState({}, '', '/');
// }
// if(isValidLogin || isValidSignUp){
//   return    <Map />
// }
// switch (currentPage) {
//   case 'landing':
//     return (
//       <LandingPage
//         onLogin={handleLogin}
//         onSignup={handleSignup}
//         onForgotPassword={handleForgotPassword}
//         /*onResetPassword={handleResetPassword}*/
//       />
//     );
//   case 'forgotPassword':
//     return <ForgotPasswordForm />;
//     case 'resetPassword':
//       return resetToken ? (
//         <ResetPasswordForm token={resetToken} onResetSuccess={onResetSuccess} />
//       ) : (
//         <div>Loading...</div>
//       );
//   default:
//     return <LandingPage onLogin={handleLogin} onSignup={handleSignup} />;
// }

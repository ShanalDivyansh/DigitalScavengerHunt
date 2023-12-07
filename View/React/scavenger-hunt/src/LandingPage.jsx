import { useEffect, useRef, useState } from "react";
import LoginSignupButton from "./components/LoginSignupButton";
import LoginForm from "./LoginForm";
import "./App.css";
import Modal from "./components/Modal";
import SignupForm from "./SignupForm";

const LandingPage = ({ onForgotPassword, onResetPassword, loggedIn }) => {
  const [loginformShow, setLoginFormShow] = useState(false);
  const [signUpFormShow, signUpSetFormShow] = useState(false);

  return (
    <div className={`container`}>
      <h1 className="title">Scavenger Hunt</h1>
      <h2 className="subTitle">
        Unlock the Town Mysteries Scavenge, Solve, Succeed!
      </h2>
      <div className="login_signup">
        <LoginSignupButton
          btnText={"Log In"}
          clickHandler={setLoginFormShow}
          singUpClickHandler={signUpSetFormShow}
          isSignupOpen={signUpFormShow}
        />
        <LoginSignupButton
          btnText={"Sign Up"}
          clickHandler={signUpSetFormShow}
          loginClickHandler={setLoginFormShow}
          isLoginOpen={loginformShow}
        />
      </div>
      {loginformShow && (
        <Modal close={setLoginFormShow} escape={true}>
          <LoginForm
            loggedIn={loggedIn}
            onForgotPassword={onForgotPassword}
            onResetPassword={onResetPassword}
          />
        </Modal>
      )}
      {signUpFormShow && (
        <Modal close={signUpSetFormShow} escape={true}>
          <SignupForm loggedIn={loggedIn} />
        </Modal>
      )}
      <img
        className="landingImg"
        alt="landing image of a mystery game"
        src="src\assets\landingPageImage.png"
      />
    </div>
  );
};
export default LandingPage;

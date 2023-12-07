import "./button.css";
const LoginSignupButton = ({
  btnText,
  clickHandler,
  singUpClickHandler,
  isSignupOpen,
  loginClickHandler,
  isLoginOpen,
}) => {
  return (
    <>
      <button
        onClick={() => {
          clickHandler((s) => !s);
          isLoginOpen && loginClickHandler((s) => !s);
          isSignupOpen && singUpClickHandler((s) => !s);
        }}
      >
        {btnText}
      </button>
    </>
  );
};
export default LoginSignupButton;

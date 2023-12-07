import { useEffect, useState } from "react";
import axios from "axios";
const LoginForm = ({ loggedIn, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  function changeHandler(e) {
    console.log(e.target.value);
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        formData
      );
      if (response.data.status === "success") {
        const headers = {
          Authorization: `Bearer ${response.data.token}`,
          "Content-Type": "application/json",
        };
        const userDetails = await axios.get(
          `http://127.0.0.1:3000/api/v1/users/${response.data.id}`,
          {
            headers,
          }
        );
        loggedIn({
          type: "loggedIn",
          payload: {
            userName: userDetails.data.data.users.userName,
            scavengerIntrests: userDetails.data.data.users.scavengerIntrests,
            rewardsCollected: userDetails.data.data.users.rewardsCollected,
            userToken: response.data.token,
            id: response.data.id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label id="userName">User Name</label>
      <input
        className="login-input"
        type="text"
        // id="userName"
        // placeholder="Username"
        value={formData.login}
        name="userName"
        onChange={(e) => {
          changeHandler(e);
        }}
      />
      <label id="password">Password</label>
      <input
        type="password"
        className="login-input"
        // id="password"
        // placeholder="Password"
        value={formData.password}
        name="password"
        onChange={changeHandler}
      />
      <button type="submit">Submit</button>
      <button
        type="button"
        className="forgot-password-link"
        onClick={onForgotPassword}
      >
        Forgot Password?
      </button>
    </form>
  );
};

export default LoginForm;

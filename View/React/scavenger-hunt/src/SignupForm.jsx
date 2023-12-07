import { useEffect, useState } from "react";
import axios from "axios";

const SignupForm = ({ loggedIn }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function validateForm() {
    const errors = {};
    if (!formData.userName.trim()) {
      errors.userName = "Username is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/signup",
        formData
      );
      if (response.data.status === "success") {
        const headers = {
          Authorization: `Bearer ${response.data.token}`,
          "Content-Type": "application/json",
        };
        const userDetails = await axios.get(
          `http://127.0.0.1:3000/api/v1/users/${response.data.data.user._id}`,
          {
            headers,
          }
        );
        loggedIn({
          type: "loggedIn",
          payload: {
            newUser: true,
            userName: userDetails.data.data.users.userName,
            scavengerIntrests: userDetails.data.data.users.scavengerIntrests,
            rewardsCollected: userDetails.data.data.users.rewardsCollected,
            userToken: response.data.token,
            id: response.data.data.user._id,
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
        id="userName"
        name="userName"
        value={formData.userName}
        onChange={(e) => {
          changeHandler(e);
        }}
      />
      {errors.userName && (
        <span className="error-message">{errors.userName}</span>
      )}
      <label id="email">Email</label>
      <input
        className="login-input"
        type="text"
        id="email"
        name="email"
        value={formData.email}
        onChange={(e) => {
          changeHandler(e);
        }}
      />
      {errors.email && <span className="error-message">{errors.email}</span>}
      <label id="password">Password</label>
      <input
        className="login-input"
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={(e) => {
          changeHandler(e);
        }}
      />
      {errors.password && (
        <span className="error-message">{errors.password}</span>
      )}
      <label id="passwordConfirm">Confirm Password</label>
      <input
        type="password"
        id="passwordConfirm"
        name="passwordConfirm"
        value={formData.passwordConfirm}
        onChange={(e) => {
          changeHandler(e);
        }}
        className="login-input"
      />
      {errors.passwordConfirm && (
        <span className="error-message">{errors.passwordConfirm}</span>
      )}
      <button className="submit-button">Sign Up</button>
    </form>
  );
};

export default SignupForm;

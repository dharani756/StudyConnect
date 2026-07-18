import { useState } from "react";

import { loginUser } from "../services/authService";

import { useNavigate, Link } from "react-router-dom";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await loginUser(formData);

      console.log("LOGIN RESPONSE:", res);
      console.log("TOKEN:", res.token);
      console.log("USER:", res.user);

      localStorage.setItem(
        "token",
        res.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      alert("Login successful");

      navigate("/dashboard");

    } catch(error){

      console.log(error);

      alert(
        error.response?.data?.message || "Login failed"
      );

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <p
          style={{
            marginTop: "15px",
            cursor: "pointer",
            color: "blue"
          }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        <div className="signup-link">

          <p>
            Don't have an account?
          </p>

          <Link to="/signup">
            Signup Here
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Login;
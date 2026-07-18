import { useState } from "react";
import { signupUser } from "../services/authService";

import "./Signup.css";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    skills: "",
    bio: "",
    experience: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleRole = (role) => {

    setFormData({
      ...formData,
      role
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {

        ...formData,

        skills:
          formData.skills
            .split(",")
            .map(skill => skill.trim())

      };

      const res = await signupUser(payload);

      alert(res.data.message);

    } catch(error){

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (

    <div className="signup-container">

      <div className="signup-box">

        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
          />

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

          <div className="role-buttons">

            <button
              type="button"
              className="student-btn"
              onClick={() => handleRole("student")}
            >
              Student
            </button>

            <button
              type="button"
              className="mentor-btn"
              onClick={() => handleRole("mentor")}
            >
              Mentor
            </button>

          </div>

          {formData.role === "mentor" && (

            <>

              <input
                type="text"
                name="skills"
                placeholder="Skills (React, Java, DSA)"
                onChange={handleChange}
              />

              <textarea
                name="bio"
                placeholder="Short Bio"
                onChange={handleChange}
              />

              <input
                type="text"
                name="experience"
                placeholder="Experience (e.g. 3 Years)"
                onChange={handleChange}
              />

            </>

          )}

          <button
            type="submit"
            className="signup-btn"
          >
            Signup
          </button>

        </form>

      </div>

    </div>

  );

}

export default Signup;
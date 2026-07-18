import { useState } from "react";
import axios from "axios";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const isMentor =
user?.role === "mentor";

  const [skills, setSkills] = useState(
    user?.skills?.join(", ") || ""
  );

  const [bio, setBio] = useState(
    user?.bio || ""
  );

  const [experience, setExperience] = useState(
    user?.experience || ""
  );

  const saveProfile = async () => {

    try {

      const res = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        {
          skills: skills
            .split(",")
            .map(skill => skill.trim()),
          bio,
          experience
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert(
        "Profile Updated Successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to Update Profile"
      );

    }

  };
  return (

  <div
    style={{
      padding: "40px",
      background: "#121212",
      minHeight: "100vh"
    }}
  >

    <h1
      style={{
        color: "#ffffff",
        marginBottom: "20px"
      }}
    >
      My Profile
    </h1>

    <div
      style={{
        marginTop: "20px",
        background: "#1e1e1e",
        padding: "30px",
        borderRadius: "15px",
        width: "550px",
        boxShadow:
          "0 4px 15px rgba(255,0,0,0.3)"
      }}
    >

      <h2
        style={{
          color: "#ff3b3b",
          marginBottom: "15px"
        }}
      >
        {user?.name}
      </h2>

      <p style={{ color: "#ffffff" }}>
        <strong>Email:</strong>{" "}
        {user?.email}
      </p>

      <p style={{ color: "#ffffff" }}>
        <strong>Role:</strong>{" "}
        {user?.role}
      </p>

      {isMentor && (
        <>
          <hr
            style={{
              margin: "20px 0",
              border: "1px solid #ff3b3b"
            }}
          />

          <label
            style={{
              color: "#ffffff",
              fontWeight: "bold"
            }}
          >
            Skills
          </label>

          <input
            type="text"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
            placeholder="React, Node.js, MongoDB"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              marginBottom: "15px",
              background: "#2a2a2a",
              color: "#ffffff",
              border: "1px solid #ff3b3b",
              borderRadius: "8px"
            }}
          />

          <label
            style={{
              color: "#ffffff",
              fontWeight: "bold"
            }}
          >
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
            rows="4"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              marginBottom: "15px",
              background: "#2a2a2a",
              color: "#ffffff",
              border: "1px solid #ff3b3b",
              borderRadius: "8px"
            }}
          />

          <label
            style={{
              color: "#ffffff",
              fontWeight: "bold"
            }}
          >
            Experience
          </label>

          <input
            type="text"
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value)
            }
            placeholder="2 Years"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              marginBottom: "20px",
              background: "#2a2a2a",
              color: "#ffffff",
              border: "1px solid #ff3b3b",
              borderRadius: "8px"
            }}
          />

          <button
            onClick={saveProfile}
            style={{
              background: "#ff3b3b",
              color: "#ffffff",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Save Profile
          </button>
        </>
      )}

    </div>

  </div>

);
}
export default Profile;
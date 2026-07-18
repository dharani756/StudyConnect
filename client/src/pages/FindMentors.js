import { useEffect, useState } from "react";
import axios from "axios";

function FindMentors() {

  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/users/mentors"
      );

      setMentors(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const requestMentor = async (mentorId) => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "http://localhost:5000/api/requests",
        {
          student: user._id,
          mentor: mentorId,
          message: "Need help with MERN Stack"
        }
      );

      alert("Request sent successfully");

    } catch (error) {

      console.log(error);

      alert("Failed to send request");

    }

  };

  return (

    <div
      style={{
        padding: "30px",
        background: "#0D1117",
        minHeight: "100vh",
        color: "#F0F6FC"
      }}
    >

      <h1>Find Mentors</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        {mentors.map((mentor) => (

          <div
            key={mentor._id}
            style={{
              background: "#21262D",
              color: "#F0F6FC",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #30363D",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}
          >

            <h2
              style={{
                color: "#58A6FF"
              }}
            >
              {mentor.name}
            </h2>

            <p>
              <strong>Email:</strong>{" "}
              {mentor.email}
            </p>

            <p>
              <strong>Skills:</strong>
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "15px"
              }}
            >

              {mentor.skills?.length > 0 ? (

                mentor.skills.map((skill) => (

                  <span
                    key={skill}
                    style={{
                      background: "#58A6FF",
                      color: "white",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontSize: "12px"
                    }}
                  >
                    {skill}
                  </span>

                ))

              ) : (

                <span>No Skills Added</span>

              )}

            </div>

            <p>
              <strong>Bio:</strong>{" "}
              {mentor.bio || "No Bio Added"}
            </p>

            <p>
              <strong>Experience:</strong>{" "}
              {mentor.experience || "Not Added"}
            </p>

            <button
              onClick={() =>
                requestMentor(mentor._id)
              }
              style={{
                marginTop: "10px",
                padding: "10px 15px",
                background: "#58A6FF",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Request Mentor
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default FindMentors;
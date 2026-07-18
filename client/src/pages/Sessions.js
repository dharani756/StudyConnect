import { useEffect, useState } from "react";
import axios from "axios";

function Sessions() {

  const [sessions, setSessions] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchSessions();

  }, []);

  const fetchSessions = async () => {

    try {

      let url = "";

      if (user.role === "student") {

        url =
        `http://localhost:5000/api/sessions/student/${user._id}`;

      } else {

        url =
        `http://localhost:5000/api/sessions/mentor/${user._id}`;

      }

      const res = await axios.get(url);

      setSessions(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const updateStatus = async (
    sessionId,
    status
  ) => {

    try {

      await axios.patch(
        `http://localhost:5000/api/sessions/${sessionId}/status`,
        {
          status
        }
      );

      fetchSessions();

    } catch (error) {

      console.log(error);

    }

  };

  const getStatusColor = (
    status
  ) => {

    if (
      status === "approved"
    )
      return "#3FB950";

    if (
      status === "rejected"
    )
      return "#F85149";

    if (
      status === "completed"
    )
      return "#3FB950";

    return "#58A6FF";

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

      <h1>My Sessions</h1>

      <h3>
        Total Sessions:
        {" "}
        {sessions.length}
      </h3>

      {sessions.length === 0 && (

        <p>
          No Sessions Scheduled Yet
        </p>

      )}

      {sessions.map((session) => (

        <div
          key={session._id}
          style={{
            background: "#21262D",
            color: "#F0F6FC",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            border:
              "1px solid #30363D",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.3)"
          }}
        >

          {user.role === "student" ? (

            <p>
              <strong>
                Mentor:
              </strong>
              {" "}
              {session.mentor?.name}
            </p>

          ) : (

            <p>
              <strong>
                Student:
              </strong>
              {" "}
              {session.student?.name}
            </p>

          )}

          {session.topic && (

            <p>
              <strong>
                Topic:
              </strong>
              {" "}
              {session.topic}
            </p>

          )}

          <p>
            <strong>
              Date:
            </strong>
            {" "}
            {session.date}
          </p>

          <p>
            <strong>
              Time:
            </strong>
            {" "}
            {session.time}
          </p>

          <p>
            <strong>
              Status:
            </strong>
            {" "}

            <span
              style={{
                color:
                  getStatusColor(
                    session.status
                  ),
                fontWeight:
                  "bold"
              }}
            >
              {session.status}
            </span>

          </p>

          {user.role ===
            "mentor" &&
            session.status ===
              "pending" && (

            <div
              style={{
                marginTop: "15px"
              }}
            >

              <button
                onClick={() =>
                  updateStatus(
                    session._id,
                    "approved"
                  )
                }
                style={{
                  background:
                    "#3FB950",
                  color: "white",
                  border: "none",
                  padding:
                    "10px 15px",
                  borderRadius:
                    "8px",
                  marginRight:
                    "10px",
                  cursor:
                    "pointer"
                }}
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    session._id,
                    "rejected"
                  )
                }
                style={{
                  background:
                    "#F85149",
                  color: "white",
                  border: "none",
                  padding:
                    "10px 15px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer"
                }}
              >
                Reject
              </button>

            </div>

          )}

          {session.meetingLink && (

            <a
              href={
                session.meetingLink
              }
              target="_blank"
              rel="noreferrer"
              style={{
                display:
                  "inline-block",
                marginTop:
                  "15px",
                background:
                  "#58A6FF",
                color: "white",
                padding:
                  "10px 15px",
                borderRadius:
                  "8px",
                textDecoration:
                  "none",
                fontWeight:
                  "bold"
              }}
            >
              Join Meeting
            </a>

          )}

        </div>

      ))}

    </div>

  );

}

export default Sessions;
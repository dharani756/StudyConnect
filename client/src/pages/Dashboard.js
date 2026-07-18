import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const [sessionCount, setSessionCount] =
  useState(0);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchSessions();

  }, []);

  const fetchSessions = async () => {

    try {

      let url = "";

      if(user?.role === "student") {

        url =
        `http://localhost:5000/api/sessions/student/${user._id}`;

      } else {

        url =
        `http://localhost:5000/api/sessions/mentor/${user._id}`;

      }

      const res = await axios.get(url);

      setSessionCount(
        res.data.length
      );

    } catch(error) {

      console.log(error);

    }

  };

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/";

  };

  return (

    <div className="dashboard-container">

      <div className="sidebar">

        <h2>StudyConnect</h2>

        <ul>

          <li onClick={() => navigate("/dashboard")}>
            Dashboard
          </li>

          {user?.role === "student" && (
            <>
              <li onClick={() => navigate("/post-doubt")}>
                Post Doubts
              </li>

              <li onClick={() => navigate("/find-mentors")}>
                Find Mentors
              </li>

              <li onClick={() => navigate("/my-doubts")}>
                My Doubts
              </li>

              <li onClick={() => navigate("/book-session")}>
                Book Session
              </li>
            </>
          )}

          {user?.role === "mentor" && (
            <>
              <li onClick={() => navigate("/mentor-requests")}>
                Mentor Requests
              </li>

              <li onClick={() => navigate("/view-doubts")}>
                View Doubts
              </li>
            </>
          )}

          <li onClick={() => navigate("/sessions")}>
            Sessions
          </li>

          <li onClick={() => navigate("/profile")}>
            Profile
          </li>

        </ul>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      <div className="main-content">

        <h1>
          Welcome {user?.name}
        </h1>

        <h3>
          Role: {user?.role}
        </h3>

        <div className="cards">

          <div className="card">

            <h2>{sessionCount}</h2>

            <p>Total Sessions</p>

          </div>

          <div className="card">

            <h2>0</h2>

            <p>Completed Sessions</p>

          </div>

          <div className="card">

            <h2>{sessionCount}</h2>

            <p>Pending Sessions</p>

          </div>

          <div className="card">

            <h2>7</h2>

            <p>Mentors</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;
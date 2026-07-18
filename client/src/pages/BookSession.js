import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookSession() {

  const [mentors, setMentors] = useState([]);
  const [mentor, setMentor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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

  const scheduleSession = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/sessions",
        {
          student: user._id,
          mentor,
          date,
          time
        }
      );

      alert(
        "Session Scheduled Successfully"
      );

      navigate("/sessions");

    } catch (error) {

      console.log(error);

      alert(
        "Failed to Schedule Session"
      );

    }

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Book Session</h1>

      <form
        onSubmit={scheduleSession}
        style={{
          maxWidth: "500px"
        }}
      >

        <label>
          Select Mentor
        </label>

        <select
          value={mentor}
          onChange={(e) =>
            setMentor(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        >

          <option value="">
            Select Mentor
          </option>

          {mentors.map((m) => (

            <option
              key={m._id}
              value={m._id}
            >
              {m.name}
            </option>

          ))}

        </select>

        <label>
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <label>
          Time
        </label>

        <input
          type="time"
          value={time}
          onChange={(e) =>
            setTime(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Schedule Session
        </button>

      </form>

    </div>

  );

}

export default BookSession;
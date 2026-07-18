import { useEffect, useState } from "react";
import axios from "axios";

function MyDoubts() {
  const [doubts, setDoubts] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (user?._id) {
      fetchMyDoubts();
    }
  }, []);

  const fetchMyDoubts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doubts/student/${user._id}`
      );

      setDoubts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Doubts</h1>

      <h3>Total Doubts: {doubts.length}</h3>

      {doubts.map((doubt) => (
        <div
          key={doubt._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3>{doubt.title}</h3>

          <p>
            <strong>Category:</strong>{" "}
            {doubt.category}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {doubt.description}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {doubt.status}
          </p>

          {doubt.answer && (
            <div
              style={{
                background: "#f5f5f5",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              <p>
                <strong>Mentor Answer:</strong>
              </p>

              <p>{doubt.answer}</p>

              <p>
                <strong>Answered By:</strong>{" "}
                {doubt.answeredBy?.name}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyDoubts;
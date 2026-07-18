import { useEffect, useState } from "react";
import axios from "axios";

function MentorRequests() {
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const mentorId = user?._id;

  useEffect(() => {
    if (mentorId) {
      fetchRequests();
    }
  }, [mentorId]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/requests/mentor/${mentorId}`
      );

      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (requestId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/requests/${requestId}`,
        { status }
      );

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mentor Requests</h2>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h4>
              Student: {req.student?.name || "Unknown"}
            </h4>

            <p>
              Status: <strong>{req.status}</strong>
            </p>

            {req.status === "pending" && (
              <>
                <button
                  onClick={() =>
                    updateStatus(req._id, "accepted")
                  }
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    marginRight: "10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(req._id, "rejected")
                  }
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MentorRequests;
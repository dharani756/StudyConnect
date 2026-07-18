import { useEffect, useState } from "react";
import axios from "axios";

function ViewDoubts() {

  const [doubts, setDoubts] = useState([]);
  const [answers, setAnswers] = useState({});

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchDoubts();

  }, []);

  const fetchDoubts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/doubts"
      );

      setDoubts(res.data);

    } catch(error){

      console.log(error);

    }

  };

  const submitAnswer = async (doubtId) => {

    try {

      await axios.patch(

        `http://localhost:5000/api/doubts/${doubtId}/answer`,

        {
          answer: answers[doubtId],
          mentorId: user._id
        }

      );

      alert("Answer Submitted");

      fetchDoubts();

    } catch(error){

      console.log(error);

    }

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>All Doubts</h1>

      {doubts.map((doubt) => (

        <div
          key={doubt._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px"
          }}
        >

          <h3>{doubt.title}</h3>

          <p>
            Student:
            {" "}
            {doubt.student?.name}
          </p>

          <p>
            Category:
            {" "}
            {doubt.category}
          </p>

          <p>
            {doubt.description}
          </p>

          <p>
            Status:
            {" "}
            {doubt.status}
          </p>

          {doubt.status === "open" && (

            <>

              <textarea
                placeholder="Write Answer"
                rows="4"
                style={{
                  width: "100%",
                  marginTop: "10px"
                }}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    [doubt._id]: e.target.value
                  })
                }
              />

              <button
                onClick={() =>
                  submitAnswer(doubt._id)
                }
                style={{
                  marginTop: "10px"
                }}
              >
                Submit Answer
              </button>

            </>

          )}

          {doubt.answer && (

            <div
              style={{
                marginTop: "15px",
                background: "#f5f5f5",
                padding: "10px"
              }}
            >

              <strong>Answer:</strong>

              <p>{doubt.answer}</p>

            </div>

          )}

        </div>

      ))}

    </div>

  );

}

export default ViewDoubts;
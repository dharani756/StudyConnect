import { useState } from "react";
import axios from "axios";

function PostDoubt() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const submitDoubt = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/doubts",
        {
          student: user._id,
          title,
          description
        }
      );

      alert("Doubt Posted Successfully");

      setTitle("");
      setDescription("");

    } catch (error) {

      console.log(error);

      alert("Failed to post doubt");

    }

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Post Doubt</h1>

      <form onSubmit={submitDoubt}>

        <input
          type="text"
          placeholder="Enter Doubt Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <textarea
          placeholder="Describe your doubt"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows="5"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <button type="submit">
          Post Doubt
        </button>

      </form>

    </div>

  );

}

export default PostDoubt;
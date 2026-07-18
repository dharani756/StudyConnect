import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");

  const sendOTP = async () => {

    try {

      const res = await axios.post(

        "http://localhost:5000/api/auth/send-otp",

        { email }

      );

      alert(res.data.message);

    } catch(error){

      alert(
        error.response?.data?.message
      );

    }

  };

  const verifyOTP = async () => {

    try {

      const res = await axios.post(

        "http://localhost:5000/api/auth/verify-otp",

        {
          email,
          otp,
          password
        }

      );

      alert(res.data.message);

    } catch(error){

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f1f5f9"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
        }}
      >

        <h1>Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px"
          }}
        />

        <button
          onClick={sendOTP}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px"
          }}
        >
          Send OTP
        </button>

        <input
          type="text"
          placeholder="Enter OTP"
          onChange={(e) =>
            setOtp(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px"
          }}
        />

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px"
          }}
        />

        <button
          onClick={verifyOTP}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px"
          }}
        >
          Verify OTP
        </button>

      </div>

    </div>

  );

}

export default ForgotPassword;
import React, { useState } from "react";
import { auth } from "../Api/Auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";



function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);

  // Input change handler
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Step 1: Email + password login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) return alert("Enter email and password");

    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);

      // Generate a 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000);
      setGeneratedOtp(otpCode);
      try {
         await axios.post("http://localhost:5000/send-otp", {
         email: user.email,  // user's input email
         otp: otpCode,       // the OTP we just generated
         });

         alert("OTP sent to your email");
         setOtpModal(true);   // show OTP input modal
       } catch (err) {
           console.error("OTP sending failed:", err);
           alert("Failed to send OTP. Check server or email credentials.");
       }
    } catch (err) {
      console.log(err);
      alert("Email or Password incorrect");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = () => {
    if (!otp) return alert("Enter OTP");

    if (otp === String(generatedOtp)) {
      alert("Login successful!");
      setOtpModal(false);
      navigate("/"); // Navigate to home page
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleLogin}>
          <h3>Login Now</h3>

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-secondary">
            Login
          </button>

          <p>
            Not registered? <Link to="/Register">Register</Link>
          </p>
        </form>
      </div>

      {/* OTP Modal */}
      {otpModal && (
        <div className="otp-modal">
          <div className="otp-box">
            <h3>Enter OTP</h3>
            <input
              type="text"
              maxLength={6}
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn-secondary" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
            <button
              className="btn-secondary"
              style={{ background: "red" }}
              onClick={() => setOtpModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import './Signup.css'; // Updated CSS filename
import lotteryImg from ".././../assets/image/lottery.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form">
          <h2>Create New Account</h2>

          <label>Full Name</label>
          <input type="text" placeholder="Enter Your Full Name" />

          <label>Phone Number</label>
          <input type="tel" placeholder="Enter Your Phone Number" />

          <label>OTP</label>
          <input type="text" placeholder="Enter OTP" />

          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
            />
            {showPassword ? (
              <FaEye className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <FaEyeSlash className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
            )}
          </div>

          <button className="signup-btn">CREATE ACCOUNT</button>
        </div>

        <div className='btn'>
        <div className="signup-image">
          <img src={lotteryImg} alt="Lottery Ticket" />
        </div>
        </div>
      </div>
    </div>
  );
}

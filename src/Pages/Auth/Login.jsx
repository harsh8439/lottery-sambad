import React, { useState } from "react";
import "./Login.css";
import lotteryImg from "../../assets/image/lottery.png";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://test.pearl-developer.com/lottery/public/api/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      localStorage.setItem("token", data.remember_token);

      console.log("Response : ", data);

      if (data.success) {
        toast.success("Login successful!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="login-box">
        <div className="login-left">
          <div className="logocontainer">
            {/* <img src="src\assets\image\logo.png" alt="Logo" className="logo" /> */}
            <h1>LOTTERY</h1>
          </div>
          <h1>Log In</h1>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <IoEyeSharp className="eye-icon" />
              ) : (
                <FaEyeSlash className="eye-icon" />
              )}
            </div>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Log In
          </button>

          {/* <a className="links" href="#">
            Forgot username or password?
          </a> */}
          {/* <Link className="links" to={"/sign-up"}>
            Create new account
          </Link> */}
        </div>
        <div className="login-right">
          <img src={lotteryImg} alt="Lottery Ticket" />
        </div>
      </div>
    </div>
  );
}

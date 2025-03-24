import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //,

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start loading

    try {
      // ItSends login data to backend
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      // Ensure a token is received before proceeding
      if (!response.data.token) {
        throw new Error("No token received from server");
      }

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);

      console.log("Login Successful:", response.data);

      // Redirect to Create Post page
      navigate("/create-post");
    } catch (error) {
      console.error("Login error:", error);

      // Handle server error response
      setError(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;

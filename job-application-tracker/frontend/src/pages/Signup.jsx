import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/api.js";
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePasswords = (password, confirmPassword) => {
    if (!confirmPassword) return "";
    return password !== confirmPassword ? "Passwords don't match" : "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      if (name === "password" || name === "confirmPassword") {
        setError(
          validatePasswords(updatedData.password, updatedData.confirmPassword),
        );
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      console.log("Form submitted:", formData);
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log("Signup response:", response);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h2>
          💼 Job<span>Tracker</span>
        </h2>
        <p>Track your job applications easily</p>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Create Your Account ✨</h2>
          <p>Let's get you started</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleInputChange}
                placeholder="Create your password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit">Create Account</button>

            <h3>
              Already have an account? <Link to="/">Log in</Link>
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
}

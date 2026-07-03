import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api.js";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();



const handleInputChange = (e) => {
  const {name, value} = e.target;
  setFormData((prevData) =>({
    ...prevData,
    [name]: value,
  }));

}

const handleSubmit = async(e) =>{
  e.preventDefault();
  try{
    const response = await loginUser(formData);
    console.log(response);
localStorage.setItem("user", JSON.stringify(response.data));

    navigate("/home");
  } catch (error) {
    console.error("Login failed:", error);
  }
}

  return (


    <>
      <h2>Job Application Tracker</h2>
      <p>Track your job application easily</p>

        <div className="login-card">    
            <h2>Welcome Back! 👋</h2>
            <p>Please login to continue to your account</p>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleInputChange} placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={handleInputChange} placeholder="Enter your password" required />
                </div>
                <button type="submit">Login</button>
                <h3>Don't have an account? <a href="/signup">Sign up</a></h3>
            </form>
            </div>
    </>
  );
}
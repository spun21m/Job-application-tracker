import { useState } from "react";
import { Link } from "react-router-dom";
import { addApplication } from "../services/api.js";
export default function AddApplication() {
 
  const[formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",  
    jobLink: "",
    applicationDate: "",
    status: ""
  });

  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();   
    try {
      const response = await addApplication(formData);
      console.log("Application added successfully:", response.data);
      setFormData({
        jobTitle: "",
        companyName: "",  
        jobLink: "",
        applicationDate: "",  
        status: ""
      });
    } catch (error) {
      console.error("Error adding application:", error);

    }
  }

  // console.log("Form data:", formData);
  
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Application</Link>
      </nav>
      <h2>Add Job Application</h2>
      <form action="post" onSubmit={handleSubmit}>
        <label htmlFor="job-title">Job Title: </label>
        <input  type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} id="job-title" />
        <hr />
        <label htmlFor="company">Company:</label>
        <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} id="companyName" />
        <hr />
        <label htmlFor="job-link">Job Link:</label>
        <input type="url" name="jobLink" value={formData.jobLink} onChange={handleInputChange} id="job-link" />
        <hr />

        <label htmlFor="date">Applied date:</label>

        <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleInputChange}  id="date" />
        <hr />
        <label htmlFor="notes">Details:</label>
        <textarea name="details" value={formData.details} onChange={handleInputChange} id="details" rows="4" cols="50"></textarea>
        <hr />
        <label htmlFor="notes">Notes:</label>
        <textarea name="notes" value={formData.notes} onChange={handleInputChange} id="notes" rows="2" cols="50"></textarea>
        <hr />

        <label htmlFor="status">Status:</label>
        <select name="status" value={formData.status} onChange={handleInputChange} id="status">
          <option value="">Select Status</option>
          <option value="APPLIED">APPLIED</option>
          <option value="INTERVIEWED">INTERVIEWED</option>
          <option value="OFFERED">OFFERED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
        <hr />
        <button type="submit">Add Application</button>
      </form>
    </div>
  );
}

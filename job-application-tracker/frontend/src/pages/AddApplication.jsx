import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addApplication } from "../services/api.js";
export default function AddApplication() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    companyLink: "",
    jobPostingLink: "",
    interviewLink: "",
    recruiterEmail: "",
    notes: "",
    jobDescription: "",
    salary: "",
    applicationDate: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);

    try {
      const response = await addApplication(formData);
      console.log("Application added successfully:", response.data);
      setFormData({
        jobTitle: "",
        companyName: "",
        companyLink: "",
        jobPostingLink: "",
        interviewLink: "",
        recruiterEmail: "",
        notes: "",
        jobDescription: "",
        salary: "",
        applicationDate: "",
        status: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding application:", error);
      console.log("Backend response:", error.response?.data);
    }
  };

  return (
    <div>
      <div className="hero">
        <nav className="hero-nav">
          <Link to="/">Dashboard</Link>
          <Link to="/add">+ New</Link>
        </nav>
      </div>

      {/* <div className="container"> */}
      <div className="form-card">
        <h2>Add New Application</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="job-title">Job Title</label>

            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              id="job-title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              id="companyName"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="company-link">Company Website Link</label>
            <input
              type="url"
              name="companyLink"
              value={formData.companyLink}
              onChange={handleInputChange}
              id="company-link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="job-posting-link">Job Posting Link</label>
            <input
              type="url"
              name="jobPostingLink"
              value={formData.jobPostingLink}
              onChange={handleInputChange}
              id="job-posting-link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="interview-link">Interview Link</label>
            <input
              type="url"
              name="interviewLink"
              value={formData.interviewLink}
              onChange={handleInputChange}
              id="interview-link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="recruiter-email">Recruiter Email</label>
            <input
              type="email"
              name="recruiterEmail"
              value={formData.recruiterEmail}
              onChange={handleInputChange}
              id="recruiter-email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Application date</label>

            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleInputChange}
              id="date"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              id="status"
              required
            >
              <option value="">Select Status</option>
              <option value="APPLIED">APPLIED</option>
              <option value="INTERVIEW">INTERVIEW</option>
              <option value="OFFERED">OFFERED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              id="salary"
              placeholder="e.g., 50000"
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              type="text"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              id="job-description"
              cols="30"
              rows="10"
              placeholder="Copy and paste the job description here to keep all details in one place and refer back to it when needed."
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              id="notes"
              cols="30"
              rows="5"
              placeholder="Recruiter call scheduled, follow up next week..., salary, interview date, interviewer name, feedback, etc."
            ></textarea>
          </div>

          <button className="btn-primary" type="submit">
            + Add Application
          </button>
        </form>
      </div>
    </div>
    // </div>
  );
}

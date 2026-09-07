import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addApplication } from "../services/api.js";
import "../styles/form.css";

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

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      // const response = await addApplication(formData);
      const response = await addApplication({
        ...formData,
        user: {
          id: user.id,
        },
      });

      navigate("/applications");
    } catch (error) {
      console.error("Error adding application:", error);
    }
  };
  return (
    <div className="add-page">
      <div className="add-page-header">
        <h1>Add Application</h1>
        <p>Add a new job application to your tracker.</p>
      </div>

      <div className="add-form-card">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="job-title">
                Job Title <span className="required">*</span>
              </label>
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
              <label htmlFor="company-name">
                Company <span className="required">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                id="company-name"
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
              <label htmlFor="date">
                Application Date <span className="required">*</span>
              </label>
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
              <label htmlFor="status">
                Status <span className="required">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                id="status"
                required
              >
                <option value="">Select Status</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFERED">Offered</option>
                <option value="REJECTED">Rejected</option>
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
          </div>

          <div className="form-group">
            <label htmlFor="job-description">Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              id="job-description"
              rows="10"
              placeholder="Copy and paste the job description here..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              id="notes"
              rows="5"
              placeholder="Recruiter call, follow-up date, interview notes, etc."
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/applications")}
            >
              Cancel
            </button>

            <button className="btn-submit" type="submit">
              + Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

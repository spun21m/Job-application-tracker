import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplicationById, updateApplication } from "../services/api";
import "../styles/form.css";
export default function EditApplication() {
  const [formData, setFormData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getApplicationDetails = async () => {
    try {
      const response = await getApplicationById(id);
      const data = response.data;
      setFormData({
        jobTitle: data.jobTitle || "",
        companyName: data.companyName || "",
        companyLink: data.companyLink || "",
        jobPostingLink: data.jobPostingLink || "",
        interviewLink: data.interviewLink || "",
        recruiterEmail: data.recruiterEmail || "",
        notes: data.notes || "",
        jobDescription: data.jobDescription || "",
        salary: data.salary || "",
        applicationDate: data.applicationDate || "",
        status: data.status || "",
      });
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };

  useEffect(() => {
    getApplicationDetails();
  }, [id]);

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
      const response = await updateApplication(id, formData);

      navigate(`/application/${id}`);
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };
  return (
    <div className="add-page">
      <div className="add-page-header">
        <h1>Edit Application</h1>
        <p>Update the details of your job application.</p>
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
                value={formData?.jobTitle || ""}
                onChange={handleInputChange}
                id="job-title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyName">
                Company <span className="required">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData?.companyName || ""}
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
                value={formData?.companyLink || ""}
                onChange={handleInputChange}
                id="company-link"
              />
            </div>

            <div className="form-group">
              <label htmlFor="job-posting-link">Job Posting Link</label>
              <input
                type="url"
                name="jobPostingLink"
                value={formData?.jobPostingLink || ""}
                onChange={handleInputChange}
                id="job-posting-link"
              />
            </div>

            <div className="form-group">
              <label htmlFor="interview-link">Interview Link</label>
              <input
                type="url"
                name="interviewLink"
                value={formData?.interviewLink || ""}
                onChange={handleInputChange}
                id="interview-link"
              />
            </div>

            <div className="form-group">
              <label htmlFor="recruiter-email">Recruiter Email</label>
              <input
                type="email"
                name="recruiterEmail"
                value={formData?.recruiterEmail || ""}
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
                value={formData?.applicationDate || ""}
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
                value={formData?.status || ""}
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
                value={formData?.salary || ""}
                onChange={handleInputChange}
                id="salary"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="job-description">Job Description</label>
            <textarea
              name="jobDescription"
              value={formData?.jobDescription || ""}
              onChange={handleInputChange}
              id="job-description"
              rows="7"
              placeholder="Copy and paste the job description here..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              value={formData?.notes || ""}
              onChange={handleInputChange}
              id="notes"
              rows="5"
              placeholder="Add notes about recruiter calls, interviews, follow-ups, feedback, etc."
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate(`/application/${id}`)}
            >
              Cancel
            </button>

            <button className="btn-submit" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

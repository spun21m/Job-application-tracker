import { Link,useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplicationById, updateApplication } from "../services/api";
export default function EditApplication(){
    const [application, setApplication] = useState(null);
    const [formData, setFormData] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();
    console.log("EditApplication component rendered with ID:", id);

      const getApplicationDetails = async () => {
        try {
          const response = await getApplicationById(id);
          const data = response.data;
          setApplication(data);
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
            status: data.status || ""
          });
        } catch (error) {
          console.error("Error fetching application details:", error);
        }
      };
      console.log("Application ID from URL:", id);
      console.log("Application details received:", application);
    
      useEffect(() => {
        getApplicationDetails();
      }, [id]);
 
 

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
      const response = await updateApplication(id, formData);
      console.log("Application updated successfully:", response.data);
      setFormData({
        jobTitle: "",
        companyName: "",  
        companyLink: "",
        applicationDate: "",  
        status: ""
      });
      navigate(`/application/${id}`);
    } catch (error) {
      console.error("Error updating application:", error);
      console.log("Backend response:", error.response?.data);
    }
  }
 
  
  return (
    <div>
      <div className="hero">
        <nav className="hero-nav">
          <Link to="/">Dashboard</Link> <Link to="/add">+ New</Link>
        </nav>
      </div>

      {/* <div className="container"> */}
      <div className="form-card">
        <h2>Update Job Application</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="job-title">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData?.jobTitle}
              onChange={handleInputChange}
              id="job-title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyName">Company</label>
            <input
              type="text"
              name="companyName"
              value={formData?.companyName}
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
              value={formData?.companyLink}
              onChange={handleInputChange}
              id="company-link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="job-posting-link">Job Posting Link</label>
            <input
              type="url"
              name="jobPostingLink"
              value={formData?.jobPostingLink}
              onChange={handleInputChange}
              id="job-posting-link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="interview-link">Interview Link</label>
            <input
              type="url"
              name="interviewLink"
              value={formData?.interviewLink}
              onChange={handleInputChange}
              id="interview-link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="recruiter-email">Recruiter Email</label>
            <input
              type="email"
              name="recruiterEmail"
              value={formData?.recruiterEmail}
              onChange={handleInputChange}
              id="recruiter-email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Application date</label>

            <input
              type="date"
              name="applicationDate"
              value={formData?.applicationDate}
              onChange={handleInputChange}
              id="date"
              required
            />
          </div>
          {/* <label htmlFor="notes">Details:</label>
        <textarea name="details" value={formData.details} onChange={handleInputChange} id="details" rows="4" cols="50"></textarea>
        <hr />
        <label htmlFor="notes">Notes:</label>
        <textarea name="notes" value={formData.notes} onChange={handleInputChange} id="notes" rows="2" cols="50"></textarea>
        <hr /> */}
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              name="status"
              value={formData?.status}
              onChange={handleInputChange}
              id="status"
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
              value={formData?.salary}
              onChange={handleInputChange}
              id="salary"
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
            Update Application
          </button>
        </form>
      </div>
    </div>
    // </div>
  );
}

import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplicationById } from "../services/api";
import { deleteApplication } from "../services/api";
export default function ApplicationDetails() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getApplicationDetails = async () => {
    try {
      const response = await getApplicationById(id);
      setApplication(response.data);
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };
  console.log("Application ID from URL:", id);
  console.log("Application details received:", application);

  useEffect(() => {
    getApplicationDetails();
  }, [id]);

  const handleDelete = async () => {
      

      try {
        await deleteApplication(id);
        console.log("Application deleted successfully");
        // Redirect to home page after deletion
        navigate("/");
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    
  };
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const modalStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
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
      {/* <div className="hero-content">
          <h2>Application Details</h2>
          <p className="details-subtext">
            View and manage your selected job application details
          </p>
        </div> */}
      <div className="details-card">
        <h2>Application Details</h2>
        <p className="details-subtext">
          View and manage your selected job application details
        </p>
        <div className="details-row">
          <span className="details-label">Job Title:</span>
          <span className="details-value">{application?.jobTitle}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Company:</span>
          <span className="details-value">{application?.companyName}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Company Website Link:</span>
          <span className="details-value">
            {application?.companyLink ? (
              <a
                href={application.companyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {application?.companyLink}
              </a>
            ) : (
              "N/A"
            )}
          </span>
        </div>
        <div className="details-row">
          <span className="details-label">Job Posting Link:</span>
          <span className="details-value">
            {application?.jobPostingLink ? (
              <a
                href={application.jobPostingLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {application?.jobPostingLink}
              </a>
            ) : (
              "N/A"
            )}
          </span>
        </div>
        <div className="details-row">
          <span className="details-label">Interview Link:</span>
          <span className="details-value">
            {application?.interviewLink ? (
              <a
                href={application.interviewLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {application?.interviewLink}
              </a>
            ) : (
              "N/A"
            )}
          </span>
        </div>
        <div className="details-row">
          <span className="details-label">Recruiter Email:</span>
          <span className="details-value">
            {application?.recruiterEmail ? (
              <a href={`mailto:${application.recruiterEmail}`}>
                {application?.recruiterEmail}
              </a>
            ) : (
              "N/A"
            )}
          </span>
        </div>
        <div className="details-row">
          <span className="details-label">Application Date:</span>
          <span className="details-value">{application?.applicationDate}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Salary:</span>
          <span className="details-value">
            {application?.salary ? `$${application.salary}` : "N/A"}
          </span>
        </div>
        <div className="details-row">
          <span className="details-label">Status:</span>
          <span
            className={`status-badge ${application?.status?.toLowerCase().trim()}`}
          >
            {application?.status}
          </span>
          {/* <span className="details-value">{application?.status}</span> */}
        </div>

        <div className="details-block">
          <div className="details-block-label">Job Description:</div>
          <div className="details-block-value">
            {application?.jobDescription}
          </div>
        </div>
        <div className="details-block">
          <div className="details-block-label">Notes:</div>
          <div className="details-block-value">
            {application?.notes || "N/A"}
          </div>
        </div>
        <div className="details-actions">
          <Link to="/">
            <button className="btn-secondary">⬅ Back to Dashboard</button>
          </Link>
          <Link to={`/edit/${id}`}>
            <button className="btn-primary">Edit</button>
          </Link>
          <button
            className="btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </div>

        {showDeleteModal && (
          <div style={overlayStyle}>
            <div style={modalStyle}>
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this application?</p>
              <div className="details-actions">
                <button className="btn-danger" onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    // </div>
  );
}

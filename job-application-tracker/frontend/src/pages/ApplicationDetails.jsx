import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplicationById } from "../services/api";
import { deleteApplication } from "../services/api";
import "../styles/details.css";
import "../styles/modal.css";
import "../styles/status.css";
export default function ApplicationDetails() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const getApplicationDetails = async () => {
    try {
      const response = await getApplicationById(id);
      setApplication(response.data);
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };

  useEffect(() => {
    getApplicationDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteApplication(id);
      console.log("Application deleted successfully");
      // Redirect to home page after deletion
      navigate("/applications");
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className="details-page">
      <div className="details-page-header">
        <div>
          <h2>Application Details</h2>
          <p>View and manage your selected job application details</p>
        </div>
      </div>
      <Link to="/applications" className="back-link">
        ← Back to Applications
      </Link>
      <div className="application-summary-card">
        <div className="application-summary-left">
          <div className="company-logo">
            {application?.companyName?.charAt(0)}
          </div>

          <div>
            <h2>{application?.jobTitle}</h2>
            <p>{application?.companyName}</p>
          </div>
        </div>

        <div className="application-summary-right">
          <span
            className={`status-badge status-${application?.status?.toLowerCase()}`}
          >
            {application?.status
              ? application.status.charAt(0) +
                application.status.slice(1).toLowerCase()
              : "N/A"}
          </span>

          <div className="summary-action-buttons">
            <Link to={`/edit/${application?.id}`} className="summary-edit-btn">
              Edit
            </Link>

            <button
              className="summary-delete-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="details-tabs">
        <button
          className={`details-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={`details-tab ${activeTab === "notes" ? "active" : ""}`}
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>

        <button
          className={`details-tab ${activeTab === "timeline" ? "active" : ""}`}
          onClick={() => setActiveTab("timeline")}
        >
          Timeline
        </button>
      </div>

      {activeTab === "overview" && (
        <>
          <div className="overview-grid">
            <div className="overview-card">
              <div className="overview-item">
                <span className="overview-label">Job Title</span>
                <span className="overview-value">
                  {application?.jobTitle || "N/A"}
                </span>
              </div>

              <div className="overview-item">
                <span className="overview-label">Company</span>
                <span className="overview-value">
                  {application?.companyName || "N/A"}
                </span>
              </div>

              <div className="overview-item">
                <span className="overview-label">Status</span>
                <span className="overview-value">
                  {application?.status || "N/A"}
                </span>
              </div>

              <div className="overview-item">
                <span className="overview-label">Application Date</span>
                <span className="overview-value">
                  {application?.applicationDate || "N/A"}
                </span>
              </div>

              <div className="overview-item">
                <span className="overview-label">Salary</span>
                <span className="overview-value">
                  {application?.salary ? `$${application.salary}` : "N/A"}
                </span>
              </div>

              <div className="overview-item">
                <span className="overview-label">Recruiter Email</span>
                <span className="overview-value">
                  {application?.recruiterEmail || "N/A"}
                </span>
              </div>
            </div>

            <div className="overview-card">
              <div className="overview-item">
                <span className="overview-label">Company Link</span>
                <span className="overview-value">
                  {application?.companyLink ? (
                    <a
                      href={application.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {application.companyLink}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>

              <div className="overview-item">
                <span className="overview-label">Job Posting Link</span>
                <span className="overview-value">
                  {application?.jobPostingLink ? (
                    <a
                      href={application.jobPostingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {application.jobPostingLink}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>

              <div className="overview-item">
                <span className="overview-label">Interview Link</span>
                <span className="overview-value">
                  {application?.interviewLink ? (
                    <a
                      href={application.interviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {application.interviewLink}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="description-card">
            <h3>Description / Notes</h3>
            <p>{application?.jobDescription || application?.notes || "N/A"}</p>
          </div>
        </>
      )}

      {activeTab === "notes" && (
        <div className="details-card">
          <div className="details-block">
            <div className="details-block-label">Notes</div>
            <div className="details-block-value">
              {application?.notes || "No notes added yet."}
            </div>
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="details-card">
          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div>
              <h4>Application Added</h4>
              <p>{application?.applicationDate || "Date not available"}</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div>
              <h4>Current Status</h4>
              <p>{application?.status || "N/A"}</p>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
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
  );
}

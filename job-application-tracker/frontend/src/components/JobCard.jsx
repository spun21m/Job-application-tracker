import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteApplication } from "../services/api.js";
import "../styles/details.css";
import "../styles/modal.css";

export default function JobCard({ application }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteApplication(application.id);
      console.log("Application deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className="job-row">
      <Link to={`/application/${application.id}`}>{application.jobTitle}</Link>
      <span>
        {application.companyLink ? (
          <a
            href={application.companyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {application.companyName}
          </a>
        ) : (
          application.companyName
        )}
      </span>
      <span
        className={`status-badge status-${application.status.toLowerCase()}`}
      >
        {application.status.charAt(0) +
          application.status.slice(1).toLowerCase()}
      </span>
      <span>{application.applicationDate}</span>
      <span>{application.salary ? `$${application.salary}` : "N/A"}</span>
      <span>
        {application.jobPostingLink && (
          <a
            href={application.jobPostingLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Posting
          </a>
        )}
      </span>
      <div className="job-actions">
        <Link
          to={`/edit/${application.id}`}
          className="action-icon-btn"
          title="Edit"
        >
          ✎
        </Link>

        <button
          type="button"
          className="action-icon-btn"
          title="Delete"
          onClick={() => setShowDeleteModal(true)}
        >
          🗑
        </button>
      </div>
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

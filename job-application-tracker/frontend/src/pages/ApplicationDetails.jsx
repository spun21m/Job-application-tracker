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
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Application</Link>
      </nav>
      <h1>Application Details</h1>
      <p>Details about the selected job application will be displayed here.</p>
      <p>Job Title: {application?.jobTitle}</p>
      <p>Job link: {application?.jobLink}</p>
      <p>Company: {application?.companyName}</p>
      <p>Application Date: {application?.applicationDate}</p>
      <p>Status: {application?.status}</p>
      <button>Edit</button>
      <button onClick={() => setShowDeleteModal(true)}>Delete</button>
      {
        showDeleteModal && (
          <div style={overlayStyle}>
            <div style={modalStyle}>
              <h2>Confirm Deletion</h2> 
              <p>Are you sure you want to delete this application?</p>
              <button onClick={handleDelete}>Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        )
      }
    </div>
  );
}

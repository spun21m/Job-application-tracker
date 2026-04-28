import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobList from "../components/JobList.jsx";
import { getAllApplications } from "../services/api.js";
import "../styles/home.css";

export default function Home() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    console.log("Fetching applications...");
    try{
      const response = await getAllApplications();
      console.log("API response:", response.data);
      setApplications(response.data);
      setLoading(false);

    }
    catch(error){
      console.error("Error fetching applications:", error);
      setLoading(false);
    }
  }

  if (loading) {
    console.log("Loading applications...");
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="hero">
        <nav className="hero-nav">
          <Link to="/">Dashboard</Link>
           <Link to="/add">+ New</Link>
        </nav>
      </div>
      <div className="hero-content">
        <h1>Job Application Tracker</h1>
        <p>💡 Track your job applications and interviews in one place.</p>
      </div>
      <div className="container">
        <h2>Your Applications</h2>
        <p>Total applications: {applications.length}</p>
        {applications.length === 0 ? (
          <p>No applications found. Start by adding your first application!</p>
        ) : (
          <JobList applications={applications} />
        )}
        <div className="actions">
          <Link to="/add">
            <button className="btn-primary">+ Add New Application</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

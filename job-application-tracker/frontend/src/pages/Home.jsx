import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobList from "../components/JobList.jsx";
import { getAllApplications } from "../services/api.js";
import "../styles/home.css";

export default function Home() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchApplication, setSearchApplication] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredApplication = applications.filter((app) => {
    const searchText = searchApplication.toLowerCase().trim();
    const matchesSearch =
      (app.jobTitle || "").toLowerCase().trim().includes(searchText) ||
      (app.companyName || "").toLowerCase().trim().includes(searchText);

    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const response = await getAllApplications();
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
    }
  }

  if (loading) {
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
        {/* <p>Total applications: {applications.length}</p> */}
        <p>
          Showing {filteredApplication.length} of {applications.length}{" "}
          applications
        </p>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchApplication}
            onChange={(e) => setSearchApplication(e.target.value)}
            className="search-input"
          />
          {searchApplication && (
            <button onClick={() => setSearchApplication("")} className="clear-btn">
              Clear
            </button>
          )}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="ALL">All</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFERED">Offered</option>
          <option value="REJECTED">Rejected</option>
        </select>
        {applications.length === 0 ? (
          <p>No applications found. Start by adding your first application!</p>
        ) : filteredApplication.length === 0 ? (
          <p>No applications match the current filter.</p>
        ) : (
          <JobList applications={filteredApplication} />
        )}
        <div className="home-actions">
          <Link to="/add">
            <button className="btn-primary">+ Add New Application</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

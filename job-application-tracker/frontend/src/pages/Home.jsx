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
      // const response = await getAllApplications();
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getAllApplications(user.id);
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
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Here's an overview of your job applications.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total-icon">▣</div>
          <div>
            <p>Total Applications</p>
            <h2>{applications.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon applied-icon">✓</div>
          <div>
            <p>Applied</p>
            <h2>
              {applications.filter((app) => app.status === "APPLIED").length}
            </h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon interview-icon">◷</div>
          <div>
            <p>Interview</p>
            <h2>
              {applications.filter((app) => app.status === "INTERVIEW").length}
            </h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon offered-icon">★</div>
          <div>
            <p>Offered</p>
            <h2>
              {applications.filter((app) => app.status === "OFFERED").length}
            </h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rejected-icon">×</div>
          <div>
            <p>Rejected</p>
            <h2>
              {applications.filter((app) => app.status === "REJECTED").length}
            </h2>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <div className="recent-header">
          <h2>Recent Applications</h2>
          <Link to="/add" className="recent-add-btn">
            + Add Application
          </Link>
        </div>

        <JobList
          applications={[...applications]
            .sort(
              (a, b) =>
                new Date(b.applicationDate) - new Date(a.applicationDate),
            )
            .slice(0, 5)}
        />
      </div>
    </div>
  );
}

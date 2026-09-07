import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import JobList from "../components/JobList.jsx";
import { getAllApplications } from "../services/api.js";
import "../styles/home.css";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchApplication, setSearchApplication] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");
  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      // const response = await getAllApplications();
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getAllApplications(user.id);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }


  const filteredApplications = applications
    .filter((app) => {
      const searchText = searchApplication.toLowerCase().trim();

      const matchesSearch =
        (app.jobTitle || "").toLowerCase().includes(searchText) ||
        (app.companyName || "").toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "NEWEST") {
        return new Date(b.applicationDate) - new Date(a.applicationDate);
      }

      if (sortBy === "OLDEST") {
        return new Date(a.applicationDate) - new Date(b.applicationDate);
      }

      if (sortBy === "COMPANY") {
        return (a.companyName || "").localeCompare(b.companyName || "");
      }

      return 0;
    });

  return (
    <div className="applications-page">
      <div className="applications-header">
        <h1>My Applications</h1>

        <Link to="/add" className="add-application-btn">
          + Add Application
        </Link>
      </div>
      <div className="applications-toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchApplication}
            onChange={(e) => setSearchApplication(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFERED">Offered</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="NEWEST">Newest First</option>
            <option value="OLDEST">Oldest First</option>
            <option value="COMPANY">Company A-Z</option>
          </select>
        </div>
      </div>

      <div className="recent-section">
        <JobList applications={filteredApplications} />
      </div>
    </div>
  );
}

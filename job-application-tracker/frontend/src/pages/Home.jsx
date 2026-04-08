import { useState, useEffect } from "react";
import { getAllApplications } from "../services/api.js";

export default function Home() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
    console.log("Applications updated:", applications);
  }, []);

  async function fetchApplications() {
    console.log("Fetching applications...");

    const response = await getAllApplications();
    console.log("API response:", response.data);
    setApplications(response.data);
    setLoading(false);
  }

  if (loading) {
    console.log("Loading applications...");
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Job Application Tracker!</h1>
      <p>Track your job applications and interviews in one place.</p>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <span>
              {app.jobTitle} at {app.companyName}
            </span>
            <span> {app.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

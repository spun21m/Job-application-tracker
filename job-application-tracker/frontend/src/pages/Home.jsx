import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobList from "../components/JobList.jsx";
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
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Application</Link>
      </nav>
      <h1>Welcome to the Job Application Tracker!</h1>
      <p>Track your job applications and interviews in one place.</p>

      <JobList applications={applications} />
      <Link to="/add">
        <button>Add Application</button>
      </Link>
    </div>
  );
}

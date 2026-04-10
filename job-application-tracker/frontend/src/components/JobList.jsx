import { Link } from "react-router-dom";
import JobCard from "../components/JobCard.jsx";

export default function JobList({ applications }) {
   return (
    <div onClick={handleClick}> 
      {applications.map((application) => (
        <Link to={`/application/${application.id}`} key={application.id}>
          <JobCard application={application} key={application.id} />
        </Link>
      ))}
    </div>
  );
}

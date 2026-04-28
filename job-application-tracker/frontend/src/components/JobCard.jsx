import { Link } from "react-router-dom";

export default function JobCard({ application }) {
  return (
    
    <div className="job-row">
      <Link to={`/application/${application.id}`}>
      <span>{application.jobTitle}</span>
      </Link>
      <span>{application.companyLink ?( <a href={application.companyLink} target="_blank" rel="noopener noreferrer">{application.companyName}</a>):(application.companyName)}</span>
      <span className={`status-badge ${application.status?.toLowerCase().trim()}`}>{application.status}</span>
      <span>{application.applicationDate}</span>
        <span>{application.salary ? `$${application.salary}` : "N/A"}</span>
      <span>{application.jobPostingLink && <a href={application.jobPostingLink} target="_blank" rel="noopener noreferrer">View Posting</a>}</span>
    </div>
  );
}

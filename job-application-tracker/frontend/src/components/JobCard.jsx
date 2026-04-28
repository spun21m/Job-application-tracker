
export default function JobCard({ application }) {
  return (
    
    <div className="job-row">
      <span>{application.jobTitle}</span>
      <span>{application.companyName && <a href={application.companyLink} target="_blank" rel="noopener noreferrer">{application.companyName}</a>}</span>
      <span>{application.status}</span>
      <span>{application.applicationDate}</span>
        <span>{application.salary ? `$${application.salary}` : "N/A"}</span>
      <span>{application.jobPostingLink && <a href={application.jobPostingLink} target="_blank" rel="noopener noreferrer">View Posting</a>}</span>
    </div>
  );
}

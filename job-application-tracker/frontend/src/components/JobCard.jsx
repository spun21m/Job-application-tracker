export default function JobCard({ application }) {
  return (
    <div>
      <h2>
        {application.jobTitle} at {application.companyName}
      </h2>
      <p> {application.applicationDate}</p>
      <p>{application.status}</p>
    </div>
  );
}

import JobCard from "../components/JobCard.jsx";

export default function JobList({ applications }) {
  return (
    <div>
      {applications.map((application) => (
        <JobCard application={application} key={application.id} />
      ))}
    </div>
  );
}

import { Link } from "react-router-dom";
import JobCard from "../components/JobCard.jsx";

export default function JobList({ applications }) {
   return (
     <div>
       <div className="job-row header">
         <span>Job Title</span>
         <span>Company</span>
         <span>Status</span>
         <span>Application Date</span>
          <span>Salary</span>
         <span>Job Posting</span>

       </div>
       {applications.map((application) => (
         <Link to={`/application/${application.id}`} key={application.id}>
           <JobCard application={application} key={application.id} />
         </Link>
       ))}
     </div>
   );
}

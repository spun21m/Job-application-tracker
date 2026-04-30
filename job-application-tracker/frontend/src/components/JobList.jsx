import { Link } from "react-router-dom";
import JobCard from "../components/JobCard.jsx";

export default function JobList({ applications }) {
   return (
     <div className="job-list">
       <div className="job-row job-list-header">
         <span>Job Title</span>
         <span>Company</span>
         <span>Status</span>
         <span>Application Date</span>
          <span>Salary</span>
         <span>Job Posting</span>

       </div>
       {[...applications].sort((a, b) => 
       a.companyName.trim().toLowerCase().localeCompare(b.companyName.trim().toLowerCase()))
       .map((application) => (
         
           <JobCard application={application} key={application.id} />
       
       ))}
     </div>
   );
}

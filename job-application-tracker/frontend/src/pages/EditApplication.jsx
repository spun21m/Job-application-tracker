import { Link,useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplicationById, updateApplication } from "../services/api";
export default function EditApplication(){
    const [application, setApplication] = useState(null);
    const [formData, setFormData] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();
    console.log("EditApplication component rendered with ID:", id);

      const getApplicationDetails = async () => {
        try {
          const response = await getApplicationById(id);
          const data = response.data;
          setApplication(data);
          setFormData({
            jobTitle: data.jobTitle || "",
            companyName: data.companyName || "",
            jobLink: data.jobLink || "",
            applicationDate: data.applicationDate || "",
            status: data.status || ""
          });
        } catch (error) {
          console.error("Error fetching application details:", error);
        }
      };
      console.log("Application ID from URL:", id);
      console.log("Application details received:", application);
    
      useEffect(() => {
        getApplicationDetails();
      }, [id]);
 
 

  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();   

    try {
      const response = await updateApplication(id, formData);
      console.log("Application updated successfully:", response.data);
      setFormData({
        jobTitle: "",
        companyName: "",  
        jobLink: "",
        applicationDate: "",  
        status: ""
      });
      navigate(`/application/${id}`);
    } catch (error) {
      console.error("Error updating application:", error);
      console.log("Backend response:", error.response?.data);
    }
  }
 
  
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Application</Link>
      </nav>
      <h2>Update Job Application</h2>
      <form action="post" onSubmit={handleSubmit}>
        <label htmlFor="job-title">Job Title: </label>
        <input  type="text" name="jobTitle" value={formData?.jobTitle} onChange={handleInputChange} id="job-title" />
        <hr />
        <label htmlFor="company">Company:</label>
        <input type="text" name="companyName" value={formData?.companyName} onChange={handleInputChange} id="companyName" />
        <hr />
        <label htmlFor="job-link">Job Link:</label>
        <input type="url" name="jobLink" value={formData?.jobLink} onChange={handleInputChange} id="job-link" />
        <hr />

        <label htmlFor="date">Applied date:</label>

        <input type="date" name="applicationDate" value={formData?.applicationDate} onChange={handleInputChange}  id="date" />
        <hr />
        {/* <label htmlFor="notes">Details:</label>
        <textarea name="details" value={formData.details} onChange={handleInputChange} id="details" rows="4" cols="50"></textarea>
        <hr />
        <label htmlFor="notes">Notes:</label>
        <textarea name="notes" value={formData.notes} onChange={handleInputChange} id="notes" rows="2" cols="50"></textarea>
        <hr /> */}

        <label htmlFor="status">Status:</label>
        <select name="status" value={formData?.status} onChange={handleInputChange} id="status">
          <option value="">Select Status</option>
          <option value="APPLIED">APPLIED</option>
          <option value="INTERVIEW">INTERVIEW</option>
          <option value="OFFERED">OFFERED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
        <hr />
        
        <button type="submit">
          Update Application
        </button>
      </form>
    </div>
  );
}

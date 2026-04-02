**Job Application Tracker**

**📌 Overview**

**The Job Application Tracker is a simple backend application built with Spring Boot that helps users manage and track their job applications.**

**It allows users to create, view, update, and delete job applications along with tracking their current status (e.g., Applied, Interview, Rejected).**

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**🚀 Tech Stack**

**•	Java**

**•	Spring Boot**

**•	Spring Data JPA**

**•	H2 / MySQL**

**•	Maven**

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**✨ Features**

**•	Add a new job application**

**•	View all job applications**

**•	View a job application by ID**

**•	Update job application details and status**

**•	Delete a job application**

**•	Track application status using enums**

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**📡 API Endpoints**

**1. Create Job Application**

**POST /api/job-applications**

**Request Body:**

**{**

&#x20; **"jobTitle": "Software Engineer Intern",**

&#x20; **"companyName": "Google",**

&#x20; **"jobLink": "https://careers.google.com",**

&#x20; **"applicationDate": "2026-03-30",**

&#x20; **"status": "APPLIED"**

**}**

**Response:**

**•	201 CREATED**

&#x20;

**!\[Create](images/img.png)**

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**2. Get All Job Applications**

**GET /api/job-applications**

**Response:**

**•	200 OK**

&#x20;

**!\[Get All](images/img\_1.png)**

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**3. Get Job Application by ID**

**GET /api/job-applications/{id}**

**Response:**

**•	200 OK**

**•	404 NOT FOUND (if ID does not exist)**

&#x20;

**!\[Get by id](images/img\_2.png)**



**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**4. Update Job Application**

**PUT /api/job-applications/{id}**

**Example (Update status to INTERVIEW):**

**{**

&#x20; **"jobTitle": "Software Engineer Intern",**

&#x20; **"companyName": "Google",**

&#x20; **"jobLink": "https://careers.google.com",**

&#x20; **"applicationDate": "2026-03-30",**

&#x20; **"status": "INTERVIEW"**

**}**

**Response:**

**•	200 OK**

&#x20;

**!\[Update](images/img\_3.png)**



**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**5. Delete Job Application**

**DELETE /api/job-applications/{id}**

**Response:**

**•	204 NO CONTENT**

&#x20;

**!\[Delete](images/img\_4.png)**



**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**🧪 Testing**

**All endpoints were tested using Postman.**

**Tested flows:**

**•	Create → Get → Update → Delete**

**•	Error handling for invalid IDs**

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**⚙️ How to Run**

**1.	Clone the repository:**

**git clone https://github.com/spun21m/Job-application-tracker.git**

**2.	Navigate to the project:**

**cd job-application-tracker**

**3.	Run the application:**

**mvn spring-boot:run**

**4.	Access API at:**

**http://localhost:8080/api/job-applications**

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**🧠 Future Improvements**

**•	Add search/filter (by status, company)**

**•	Add frontend (React)**

**•	Add authentication (user accounts)**

**•	Deploy to cloud (AWS / Render / Railway)**

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**👨‍💻 Author**

**Sital Pun**

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**








package com.job_tracker.controller;

import com.job_tracker.entity.JobApplicationTracker;
import com.job_tracker.service.JobApplicationTrackerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/job-applications")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://job-application-tracker-lovat-delta.vercel.app"
})
public class JobApplicationTrackerCrontroller {


    private final JobApplicationTrackerService service;

    public JobApplicationTrackerCrontroller(JobApplicationTrackerService service) {
        this.service = service;
    }

//    CREATE
    @PostMapping
    public ResponseEntity<JobApplicationTracker> create(@Valid @RequestBody JobApplicationTracker body){
        JobApplicationTracker saved = service.addJobApplication(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

//    View all job applications
    @GetMapping()
    public ResponseEntity<List<JobApplicationTracker>> getAll(){
        List<JobApplicationTracker> list = service.viewAllJobApplications();
        return ResponseEntity.ok(list);
    }

//    View one application by id
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationTracker> getById(@PathVariable Long id){
        JobApplicationTracker jobApplication = service.viewJobApplication(id);
        return ResponseEntity.ok(jobApplication);
    }

//    Update applications by id
    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationTracker> updateApplication(@PathVariable Long id, @Valid @RequestBody JobApplicationTracker body){
        JobApplicationTracker updatedApplication = service.updateJobApplication(body, id);
        return ResponseEntity.ok(updatedApplication);
    }

//    Delte application by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id){
        service.deleteJobApplication(id);
        return ResponseEntity.noContent().build();
    }
}

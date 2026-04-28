package com.job_tracker.service;

import com.job_tracker.entity.JobApplicationStatus;
import com.job_tracker.entity.JobApplicationTracker;
import com.job_tracker.repository.JobApplicationTrackerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class JobApplicationTrackerServiceImpl implements JobApplicationTrackerService{

    @Autowired
    private JobApplicationTrackerRepo jobApplicationTrackerRepo;

    @Override
    public JobApplicationTracker addJobApplication(JobApplicationTracker jobApplicationTracker) {
        return jobApplicationTrackerRepo.save(jobApplicationTracker);

    }

    @Override
    public List<JobApplicationTracker> viewAllJobApplications() {
        return  jobApplicationTrackerRepo.findAll();
    }

    @Override
    public JobApplicationTracker viewJobApplication(Long id) {

        return jobApplicationTrackerRepo.findById(id).orElseThrow(
                ()->new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Job application not found with id " + id
        ));

    }

    @Override
    public JobApplicationTracker updateJobApplication(JobApplicationTracker jobApplicationTracker, Long id) {
        JobApplicationTracker existingApplication =  jobApplicationTrackerRepo.findById(id).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Job application with id " + id + " not found."
        ));



        existingApplication.setCompanyName(jobApplicationTracker.getCompanyName());
        existingApplication.setJobTitle(jobApplicationTracker.getJobTitle());
        existingApplication.setCompanyLink(jobApplicationTracker.getCompanyLink());
        existingApplication.setApplicationDate(jobApplicationTracker.getApplicationDate());
        existingApplication.setInterviewLink(jobApplicationTracker.getInterviewLink());
        existingApplication.setRecruiterEmail(jobApplicationTracker.getRecruiterEmail());
        existingApplication.setNotes(jobApplicationTracker.getNotes());
        existingApplication.setJobDescription(jobApplicationTracker.getJobDescription());
        existingApplication.setSalary(jobApplicationTracker.getSalary());
        return jobApplicationTrackerRepo.save(existingApplication);
    }

    @Override
    public void deleteJobApplication(Long id) {
        JobApplicationTracker existingApplication = jobApplicationTrackerRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Job application with id " + id + " not found."
                ));
        jobApplicationTrackerRepo.delete(existingApplication);
    }
}
package com.job_tracker.service;

import com.job_tracker.entity.JobApplicationTracker;

import java.util.List;

public interface JobApplicationTrackerService {
    JobApplicationTracker addJobApplication(JobApplicationTracker jobApplicationTracker);
    List<JobApplicationTracker> viewAllJobApplications();
    JobApplicationTracker viewJobApplication(Long id);

    JobApplicationTracker updateJobApplication(JobApplicationTracker jobApplicationTracker, Long id);
    void deleteJobApplication(Long id);

}

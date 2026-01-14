package com.job_tracker.repository;

import com.job_tracker.entity.JobApplicationTracker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationTrackerRepo extends JpaRepository<JobApplicationTracker, Long> {

}

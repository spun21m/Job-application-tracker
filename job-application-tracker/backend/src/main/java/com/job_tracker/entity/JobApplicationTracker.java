package com.job_tracker.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Entity
@Data
public class JobApplicationTracker {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String jobTitle;

    @NotBlank
    private String companyName;
    private String companyLink;
    private String jobPostingLink;
    private String interviewLink;

    @Email
    private String recruiterEmail;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(columnDefinition = "TEXT")
    private String jobDescription;

    @Positive
    private Double salary;

    @NotNull
    private LocalDate applicationDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    private JobApplicationStatus status;



}

package com.job_tracker.service;

import com.job_tracker.dto.AuthResponse;
import com.job_tracker.dto.Login;
import com.job_tracker.dto.SignUp;

public interface UserAuthService {
    AuthResponse signup(SignUp request);

    AuthResponse login(Login request);
}

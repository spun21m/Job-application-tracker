package com.job_tracker.controller;


import com.job_tracker.dto.AuthResponse;
import com.job_tracker.dto.Login;
import com.job_tracker.dto.SignUp;
import com.job_tracker.service.UserAuthService;
import com.job_tracker.service.UserAuthServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://job-application-tracker-lovat-delta.vercel.app"
})
public class UserAuthController {

    private final UserAuthService userAuthService;


    public UserAuthController(UserAuthService userAuthService) {
        this.userAuthService = userAuthService;
    }

    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody SignUp request) {

        return userAuthService.signup(request);

    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody Login request) {
        return userAuthService.login(request);

    }
}

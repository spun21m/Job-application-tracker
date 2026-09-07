package com.job_tracker.service;

import com.job_tracker.dto.AuthResponse;
import com.job_tracker.dto.Login;
import com.job_tracker.dto.SignUp;
import com.job_tracker.entity.User;
import com.job_tracker.repository.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserAuthServiceImpl implements UserAuthService {


    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserAuthServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponse signup(SignUp request) {
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email exists already!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepo.save(user);
        return new AuthResponse(savedUser.getId(), savedUser.getName(), savedUser.getEmail());
    }

    @Override
    public AuthResponse login(Login request) {
        User user = userRepo.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException(("Invalid email or password.")));

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );
        if (!passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        return new AuthResponse(user.getId(), user.getName(), user.getEmail());
    }
}

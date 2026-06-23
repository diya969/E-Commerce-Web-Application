package com.ecommerce.shopfront.service;

import com.ecommerce.shopfront.dto.ProfileResponse;
import com.ecommerce.shopfront.dto.UpdateProfileRequest;
import com.ecommerce.shopfront.entity.User;
import com.ecommerce.shopfront.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return toProfileResponse(user);
    }

    public ProfileResponse updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setName(request.getName());
        user.setAddress(request.getAddress());
        userRepository.save(user);
        return toProfileResponse(user);
    }

    private ProfileResponse toProfileResponse(User user) {
        return new ProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getAddress()
        );
    }
}
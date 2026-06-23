package com.ecommerce.shopfront.controller;
// src/main/java/com/shopfront/controller/AuthController.java
import com.ecommerce.shopfront.dto.AuthResponse;
import com.ecommerce.shopfront.dto.LoginRequest;
import com.ecommerce.shopfront.dto.RegisterRequest;
import com.ecommerce.shopfront.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
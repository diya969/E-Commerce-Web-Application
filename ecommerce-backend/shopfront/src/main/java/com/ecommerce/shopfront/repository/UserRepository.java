package com.ecommerce.shopfront.repository;
// src/main/java/com/shopfront/repository/UserRepository.java

import com.ecommerce.shopfront.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
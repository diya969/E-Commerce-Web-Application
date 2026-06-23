package com.ecommerce.shopfront.repository;
// src/main/java/com/shopfront/repository/ProductRepository.java

import com.ecommerce.shopfront.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
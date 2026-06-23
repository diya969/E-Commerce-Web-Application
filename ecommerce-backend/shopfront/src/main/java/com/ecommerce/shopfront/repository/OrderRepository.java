package com.ecommerce.shopfront.repository;
// src/main/java/com/shopfront/repository/OrderRepository.java
import com.ecommerce.shopfront.entity.Order;
import com.ecommerce.shopfront.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
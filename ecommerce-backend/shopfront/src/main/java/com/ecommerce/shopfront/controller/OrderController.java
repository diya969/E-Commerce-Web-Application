package com.ecommerce.shopfront.controller;
// src/main/java/com/shopfront/controller/OrderController.java
import com.ecommerce.shopfront.dto.OrderRequest;
import com.ecommerce.shopfront.dto.OrderResponse;
import com.ecommerce.shopfront.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(Authentication authentication,
                                                     @Valid @RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.createOrder(authentication.getName(), request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<OrderResponse>> getMyOrders(Authentication authentication) {
        return ResponseEntity.ok(orderService.getOrdersForUser(authentication.getName()));
    }
}
package com.ecommerce.shopfront.service;
// src/main/java/com/shopfront/service/OrderService.java
import com.ecommerce.shopfront.dto.OrderRequest;
import com.ecommerce.shopfront.dto.OrderResponse;
import com.ecommerce.shopfront.entity.Order;
import com.ecommerce.shopfront.entity.Product;
import com.ecommerce.shopfront.entity.User;
import com.ecommerce.shopfront.repository.OrderRepository;
import com.ecommerce.shopfront.repository.ProductRepository;
import com.ecommerce.shopfront.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public OrderResponse createOrder(String userEmail, OrderRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        BigDecimal total = product.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));

        Order order = new Order(user, product, request.getQuantity(), total, "PENDING");
        orderRepository.save(order);

        return toOrderResponse(order);
    }

    public List<OrderResponse> getOrdersForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return orderRepository.findByUser(user)
                .stream()
                .map(this::toOrderResponse)
                .toList();
    }

    private OrderResponse toOrderResponse(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getProduct().getName(),
                order.getQuantity(),
                order.getTotal(),
                order.getStatus()
        );
    }
}
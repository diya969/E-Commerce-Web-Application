package com.ecommerce.shopfront.dto;
// src/main/java/com/shopfront/dto/OrderResponse.java
import java.math.BigDecimal;

public class OrderResponse {
    private Long id;
    private String productName;
    private Integer quantity;
    private BigDecimal total;
    private String status;

    public OrderResponse(Long id, String productName, Integer quantity, BigDecimal total, String status) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.total = total;
        this.status = status;
    }

    public Long getId() { return id; }
    public String getProductName() { return productName; }
    public Integer getQuantity() { return quantity; }
    public BigDecimal getTotal() { return total; }
    public String getStatus() { return status; }
}
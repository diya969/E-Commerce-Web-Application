package com.ecommerce.shopfront.dto;

public class ProfileResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String address;

    public ProfileResponse(Long id, String name, String email, String role, String address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.address = address;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getAddress() { return address; }
}
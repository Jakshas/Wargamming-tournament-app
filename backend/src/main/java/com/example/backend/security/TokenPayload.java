package com.example.backend.security;

import com.example.backend.data.User;

public class TokenPayload {
    private final String ID;
    private final User.Role role;
    private final String password;
    public Object userRepository;

    public TokenPayload(String ID, User.Role role, String password) {
        this.ID = ID;
        this.role = role;
        this.password = password;
    }

    public String getID() {
        return ID;
    }

    public User.Role getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }

}
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

    /**
     * @return String
     */
    public String getID() {
        return ID;
    }

    /**
     * @return Role
     */
    public User.Role getRole() {
        return role;
    }

    /**
     * @return String
     */
    public String getPassword() {
        return password;
    }

}
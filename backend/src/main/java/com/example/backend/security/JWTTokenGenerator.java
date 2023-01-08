package com.example.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTTokenGenerator {
    @Autowired
    private JWTTokenUtils tokenUtils;

    /**
     * Generate token
     * 
     * @param id
     * @param role
     * @param password
     * @return String
     */
    public String build(Object id, Object role, Object password) {
        return JWT.create()
                .withSubject(id.toString())
                .withClaim("role", role.toString())
                .withClaim("password", password.toString())
                .withExpiresAt(new Date(System.currentTimeMillis() + tokenUtils.getExpirationTime()))
                .sign(Algorithm.HMAC512(tokenUtils.getSecret().getBytes()));
    }
}
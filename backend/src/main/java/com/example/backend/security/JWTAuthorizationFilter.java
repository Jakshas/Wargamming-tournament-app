package com.example.backend.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private final JWTTokenUtils tokenUtils;

    public JWTAuthorizationFilter(AuthenticationManager authManager, JWTTokenUtils tokenUtils) {
        super(authManager);
        this.tokenUtils = tokenUtils;
    }

    /**
     * @param req
     * @param res
     * @param chain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(tokenUtils.getHeaderString());

        if (header == null || !header.startsWith(tokenUtils.getTokenPrefix())) {
            chain.doFilter(req, res);
            return;
        }
        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    /**
     * @param request
     * @return UsernamePasswordAuthenticationToken
     */
    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(tokenUtils.getHeaderString());
        if (token != null) {
            TokenPayload tokenPayload = tokenUtils.decodeToken(token);
            if (tokenPayload.getID() != null) {
                return new UsernamePasswordAuthenticationToken(tokenPayload.getID(), null,
                        Collections.singletonList(tokenPayload.getRole()));
            }
        }
        return null;
    }
}
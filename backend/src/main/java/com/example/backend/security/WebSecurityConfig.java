package com.example.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    protected AuthenticationManager getAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Autowired
    protected JWTTokenUtils tokenUtils;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .headers().frameOptions().disable()
                .and()
                .cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/graphql").permitAll()
                .antMatchers("/graphiql", "/vendor/graphiql/*").permitAll()
                .anyRequest().denyAll()
                .and()
                .addFilter(new JWTAuthorizationFilter(getAuthenticationManager(), tokenUtils))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
}
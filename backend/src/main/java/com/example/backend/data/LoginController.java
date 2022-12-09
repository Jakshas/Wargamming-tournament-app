package com.example.backend.data;

import java.util.stream.StreamSupport;

import org.json.JSONObject;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.example.backend.data.repositories.UserRepository;
import com.example.backend.security.JWTTokenGenerator;

@Controller
public class LoginController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTTokenGenerator tokenGenerator;

    @MutationMapping
    public String addUser(@Argument(name = "name") String name, @Argument(name = "email") String email,
            @Argument(name = "password") String password) {

        User n = new User();
        n.setPassword(password);
        n.setName(name);
        n.setEmail(email);
        userRepository.save(n);
        return "Added";
    }

    @MutationMapping
    public String login(@Argument(name = "email") String email, @Argument(name = "password") String password) {

        User u = StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .filter((x) -> x.getEmail().equals(email)).findAny().orElse(null);
        if (u != null && u.getPassword().equals(password)) {
            JSONObject jsonObject = new JSONObject().put("id", u.getId()).put("key",
                    tokenGenerator.build(u.getId(), User.Role.NORMAL, u.getPassword()));
            return jsonObject.toString();
        }
        return "Wrong";
    }
}

package com.tripbuddies.controller;

import com.tripbuddies.service.AuthService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String addNewUser(@RequestHeader("Authorization") String token) throws IOException {
        return service.saveUser(token);
    }

    @PostMapping("/token")
    public String getToken(@RequestHeader("Authorization") String token) {
        return token;
    }

    @GetMapping("/validate")
    public boolean validateToken(@RequestParam("token") String token) {
        return service.validateToken(token);
    }
}

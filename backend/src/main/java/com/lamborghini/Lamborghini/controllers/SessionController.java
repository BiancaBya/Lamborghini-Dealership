package com.lamborghini.Lamborghini.controllers;

import com.lamborghini.Lamborghini.domain.Client;
import com.lamborghini.Lamborghini.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class SessionController {

    private final SessionService sessionService;

    @Autowired
    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/login")
    public Object login(@RequestParam String email, @RequestParam String password) {
        return sessionService.login(email, password);
    }

    @PostMapping("/signup")
    public Client signup(@RequestBody Client client) {
        return sessionService.signup(client);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam String email) {
        sessionService.logout(email);
        return ResponseEntity.ok("User logged out successfully");
    }

}






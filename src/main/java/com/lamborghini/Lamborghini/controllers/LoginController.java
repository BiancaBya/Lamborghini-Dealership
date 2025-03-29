package com.lamborghini.Lamborghini.controllers;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.domain.Client;
import com.lamborghini.Lamborghini.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public Object login(@RequestParam String email, @RequestParam String password) {
        return loginService.login(email, password);
    }

    @PostMapping("/signup")
    public Client signup(@RequestBody Client client) {
        return loginService.signup(client);
    }


}






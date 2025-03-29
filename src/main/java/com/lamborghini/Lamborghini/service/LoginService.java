package com.lamborghini.Lamborghini.service;

import com.lamborghini.Lamborghini.domain.Admin;
import com.lamborghini.Lamborghini.domain.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final ClientService clientService;
    private final AdminService adminService;
    private final PasswordService passwordService = new PasswordService();

    @Autowired
    public LoginService(ClientService clientService, AdminService adminService) {
        this.clientService = clientService;
        this.adminService = adminService;
    }


    private Admin isAdmin(String email) {

        /// Verifies if the specified email belongs to an admin

        for (Admin admin : adminService.findAll()) {
            if (admin.getEmail().equals(email)) {
                return admin;
            }
        }
        return null;
    }

    private Client isClient(String email) {

        /// Verifies if the specified email belongs to a client

        for (Client client : clientService.findAll()) {
            if (client.getEmail().equals(email)) {
                return client;
            }
        }
        return null;
    }

    public Object login(String email, String password){

        /// the function first verifies if the email belong to an admin or a client
        /// after that, it verifies if the provided password matches the one encrypted in the database
        /// if so, it returns the found entity, admin or client
        /// if not, it throws an error

        Admin admin = isAdmin(email);

        if (admin != null) {
            if(passwordService.matches(password, admin.getPassword())){
                return admin;
            }
            throw new RuntimeException("Invalid password");
        }

        Client client = isClient(email);

        if (client != null) {
            if(passwordService.matches(password, client.getPassword())){
                return client;
            }
            throw new RuntimeException("Invalid password");
        }

        throw new RuntimeException("User not found");
    }

    public Client signup(Client client) {

        if(clientService.existsByEmail(client.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        return clientService.save(client);
    }

}




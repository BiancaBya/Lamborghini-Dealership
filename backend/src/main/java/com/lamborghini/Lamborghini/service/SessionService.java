package com.lamborghini.Lamborghini.service;

import com.lamborghini.Lamborghini.domain.Admin;
import com.lamborghini.Lamborghini.domain.Client;
import com.lamborghini.Lamborghini.utils.LoginResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class SessionService {

    private final ClientService clientService;
    private final AdminService adminService;
    private final PasswordService passwordService = new PasswordService();
    private final Map<String, Boolean> activeUsers = new HashMap<>();

    @Autowired
    public SessionService(ClientService clientService, AdminService adminService) {
        this.clientService = clientService;
        this.adminService = adminService;
    }

    public Object login(String email, String password){

        /// the function first verifies if the email belong to an admin or a client
        /// after that, it verifies if the provided password matches the one encrypted in the database
        /// and if the user is already logged in or not
        /// if so, it returns the found entity, admin or client, and saves it in the activeUsers Map
        /// if not, it throws an error

        if (activeUsers.containsKey(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already logged in");
        }

        Optional<Admin> admin = adminService.findByEmail(email);

        if (admin.isPresent()) {
            if(passwordService.matches(password, admin.get().getPassword())){

                activeUsers.put(email, true);

                return new LoginResponseDTO(
                        admin.get().getId(),
                        admin.get().getEmail(),
                        "ADMIN",
                        null,
                        null
                );
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        Optional<Client> client = clientService.findByEmail(email);

        if (client.isPresent()) {
            if(passwordService.matches(password, client.get().getPassword())){

                activeUsers.put(email, true);

                return new LoginResponseDTO(
                        client.get().getId(),
                        client.get().getEmail(),
                        "CLIENT",
                        client.get().getFirstName(),
                        client.get().getLastName()
                );
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    public Client signup(Client client) {

        /// the function verifies if the client's email is available
        /// after that, it saves the client in the database

        if(clientService.existsByEmail(client.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if(adminService.existsByEmail(client.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        return clientService.save(client);
    }

    public void logout(String email) {

        /// removes the user from the current session

        activeUsers.remove(email);
    }

}




package com.lamborghini.Lamborghini.controllers;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.domain.Client;
import com.lamborghini.Lamborghini.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveClient(@RequestBody Client client) {
        clientService.save(client);
        return ResponseEntity.status(HttpStatus.CREATED).body("Client saved successfully.");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCar(@RequestBody Client client) {
        try {
            clientService.delete(client);
            return ResponseEntity.ok("Client deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client does not exist.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Client>> findAllClients() {
        List<Client> clients = clientService.findAll();
        return clients.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(clients);
    }

}





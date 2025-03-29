package com.lamborghini.Lamborghini.service;

import com.lamborghini.Lamborghini.domain.Client;
import com.lamborghini.Lamborghini.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final PasswordService passwordService = new PasswordService();

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Optional<Client> findByEmail(String email) {

        /// used for login to find the client with the specified email
        /// to see id the password matches with the one stored in the database

        return clientRepository.findByEmail(email);
    }

    public Client save(Client client) {

        /// before saving the client, the password is encrypted for safety
        /// after that, the client is saved to the database with the encrypted password

        String passwordEncoded = passwordService.hashPassword(client.getPassword());
        client.setPassword(passwordEncoded);
        return clientRepository.save(client);
    }

    public void delete(Client client) {

        /// deletes a client from the database

        clientRepository.delete(client);
    }

    public boolean existsByEmail(String email) {
        return clientRepository.existsByEmail(email);
    }

    public List<Client> findAll() {

        /// find all clients in the database

        return clientRepository.findAll();
    }
}





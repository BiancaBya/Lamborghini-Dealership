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

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Optional<Client> findByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    public void save(Client client) {
        clientRepository.save(client);
    }

    public void delete(Client client) {
        clientRepository.delete(client);
    }

    public List<Client> findAll() {
        return clientRepository.findAll();
    }
}





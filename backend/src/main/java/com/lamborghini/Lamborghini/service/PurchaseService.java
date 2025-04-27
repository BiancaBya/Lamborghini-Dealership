package com.lamborghini.Lamborghini.service;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.domain.Client;
import com.lamborghini.Lamborghini.domain.Purchase;
import com.lamborghini.Lamborghini.repository.CarRepository;
import com.lamborghini.Lamborghini.repository.ClientRepository;
import com.lamborghini.Lamborghini.repository.PurchaseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ClientRepository clientRepository;
    private final CarRepository carRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository, ClientRepository clientRepository, CarRepository carRepository) {
        this.purchaseRepository = purchaseRepository;
        this.clientRepository = clientRepository;
        this.carRepository = carRepository;
    }

    public void save(Purchase purchase) {

        /// the function finds the car and the client in the database
        /// if there is no other purchase made by that client with the given car
        /// and the given data is correct, the new purchase is saved

        Client client = clientRepository
                .findByEmail(purchase.getClient().getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Client not found"));

        Car car = carRepository
                .findByModelAndYearAndHorsepowerAndPrice(
                        purchase.getCar().getModel(),
                        purchase.getCar().getYear(),
                        purchase.getCar().getHorsepower(),
                        purchase.getCar().getPrice()
                )
                .orElseThrow(() -> new EntityNotFoundException("Car not found"));

        if(purchaseRepository.existsByCarAndClient(car, client)){
            throw new IllegalArgumentException("Purchase already exists");
        }

        Purchase toSave = Purchase.builder()
                .car(car)
                .client(client)
                .purchaseDate(LocalDate.now())
                .build();

        purchaseRepository.save(toSave);
    }

    public void delete(Purchase purchase) {

        /// the function verifies if the given car and client exists in the database
        /// and also if there is a registered purchase with the given data
        /// if so, the purchase is deleted

        Car car = purchase.getCar();
        Client client = purchase.getClient();

        Car foundCar = carRepository
                .findByModelAndYearAndHorsepowerAndPrice(car.getModel(), car.getYear(), car.getHorsepower(), car.getPrice())
                .orElseThrow(() -> new EntityNotFoundException("Car not found"));

        Client foundClient = clientRepository
                .findByEmail(client.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Client not found"));

        Purchase foundPurchase = purchaseRepository
                .findByCarAndClient(foundCar, foundClient)
                .orElseThrow(() -> new EntityNotFoundException("Purchase with given client and car not found"));

        purchaseRepository.delete(foundPurchase);
    }

    public List<Purchase> findAll(){

        /// get all purchases in the database

        return purchaseRepository.findAll();
    }

    public List<Purchase> findAllByClient(Client client){

        /// get all purchases registered for a client

        Client foundClient = clientRepository
                .findByEmail(client.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Client not found"));

        return purchaseRepository.findAllByClient(foundClient);
    }

    public List<String> findModelsByClient(Client client){

        /// finds all the distinct car models in the database that the client owns

        List<Purchase> purchases = findAllByClient(client);

        List<String> models = Arrays.asList("Huracan", "Aventador", "Revuelto", "Urus");

        Set<String> result = new LinkedHashSet<>();

        for (Purchase p : purchases) {
            String fullName = p.getCar().getModel();
            for (String key : models) {
                if (fullName.contains(key)) {
                    result.add(key);
                }
            }
        }

        return new ArrayList<>(result);
    }

}




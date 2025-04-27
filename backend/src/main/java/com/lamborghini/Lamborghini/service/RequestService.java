package com.lamborghini.Lamborghini.service;

import com.lamborghini.Lamborghini.domain.*;
import com.lamborghini.Lamborghini.repository.CarRepository;
import com.lamborghini.Lamborghini.repository.ClientRepository;
import com.lamborghini.Lamborghini.repository.PurchaseRepository;
import com.lamborghini.Lamborghini.repository.RequestRepository;
import com.lamborghini.Lamborghini.utils.CarEvent;
import com.lamborghini.Lamborghini.utils.RequestEvent;
import com.lamborghini.Lamborghini.utils.PurchaseEvent;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final CarRepository carRepository;
    private final ClientRepository clientRepository;
    private final PurchaseRepository purchaseRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public RequestService(RequestRepository requestRepository, CarRepository carRepository, ClientRepository clientRepository, PurchaseRepository purchaseRepository, SimpMessagingTemplate messagingTemplate) {
        this.requestRepository = requestRepository;
        this.carRepository = carRepository;
        this.clientRepository = clientRepository;
        this.purchaseRepository = purchaseRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public void save(Request request) {

        /// the function verifies if the provided request data is valid
        /// after that, it verifies that there is no other request in the database with the given data
        /// if not, it saves the new request

        if (request.getClient() == null || request.getCar() == null || request.getRequestType() == null) {
            throw new IllegalArgumentException("Incomplete request data!");
        }

        Client client = clientRepository
                .findByEmail(request.getClient().getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Client not found!"));

        Car car = carRepository
                .findByModelAndYearAndHorsepowerAndPrice(
                        request.getCar().getModel(),
                        request.getCar().getYear(),
                        request.getCar().getHorsepower(),
                        request.getCar().getPrice()
                )
                .orElseThrow(() -> new EntityNotFoundException("Car not found!"));

        if (requestRepository.existsByCarAndClientAndRequestType(car, client, request.getRequestType())) {
            throw new IllegalArgumentException("Request already exists!");
        }

        if (purchaseRepository.existsByCarAndClient(car, client) && request.getRequestType().equals(RequestType.BUY)) {
            throw new IllegalArgumentException("You have already purchased this car!");
        }

        Request toSave = Request.builder()
                .client(client)
                .car(car)
                .requestType(request.getRequestType())
                .build();

        requestRepository.save(toSave);
        messagingTemplate.convertAndSend("/topic/requests", new RequestEvent(RequestEvent.Type.CREATED, toSave));
    }

    public void delete(Request request) {

        /// the function verifies if the specified request exists in the database
        /// if so, it deletes

        Client client = clientRepository
                .findByEmail(request.getClient().getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Client not found!"));

        Car car = carRepository
                .findByModelAndYearAndHorsepowerAndPrice(
                        request.getCar().getModel(),
                        request.getCar().getYear(),
                        request.getCar().getHorsepower(),
                        request.getCar().getPrice()
                )
                .orElseThrow(() -> new EntityNotFoundException("Car not found!"));

        Request found = requestRepository
                .findByCarAndClientAndRequestType(car, client, request.getRequestType())
                .orElseThrow(() -> new EntityNotFoundException("Request not found!"));

        requestRepository.delete(found);
    }

    public List<Request> findAll() {

        /// find all request in the database

        return requestRepository.findAll();
    }

    @Transactional
    public void acceptRequest(Request request) {

        /// the function receives a request with a given client and car
        /// if the client, car and the request exists in the database, it processes the request
        /// -- if the client wants to buy a car, it verifies that there is no purchase with the same data
        /// and decrements the stock of the car, saves the new purchase and deletes the request
        /// -- if the client wants to return the car, it verifies if the purchase exists
        /// and increments the stock of the car, deletes the old purchase and deletes the request

        Car car = request.getCar();
        Client client = request.getClient();

        Car foundCar = carRepository
                .findByModelAndYearAndHorsepowerAndPrice(car.getModel(), car.getYear(), car.getHorsepower(), car.getPrice())
                .orElseThrow(() -> new EntityNotFoundException("Car not found!"));

        Client foundClient = clientRepository
                .findByEmail(client.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Client not found!"));

        Request foundRequest = requestRepository
                .findByCarAndClientAndRequestType(foundCar, foundClient, request.getRequestType())
                .orElseThrow(() -> new EntityNotFoundException("Request not found!"));

        if (foundRequest.getRequestType().equals(RequestType.BUY)){
            acceptBuyRequest(foundRequest, foundCar, foundClient);
        }
        else if (foundRequest.getRequestType().equals(RequestType.RETURN)){
            acceptReturnRequest(foundRequest, foundCar, foundClient);
        }

        carRepository.save(foundCar);
        delete(foundRequest);
        messagingTemplate.convertAndSend("/topic/requests", new RequestEvent(RequestEvent.Type.ACCEPTED, foundRequest));
    }

    private void acceptBuyRequest(Request request, Car boughtCar, Client buyerClient) {

        /// management of buy requests

        if (purchaseRepository.existsByCarAndClient(boughtCar, buyerClient)) {
            throw new IllegalArgumentException("Purchase already exists!");
        }

        Purchase newPurchase = Purchase.builder().
                car(boughtCar).
                client(buyerClient).
                purchaseDate(LocalDate.now()).
                build();

        boughtCar.setStock(boughtCar.getStock() - 1);

        if (boughtCar.getStock() == 0)
            messagingTemplate.convertAndSend("/topic/cars", new CarEvent(CarEvent.Type.DELETED, boughtCar));

        purchaseRepository.save(newPurchase);
        messagingTemplate.convertAndSend("/topic/purchases", new PurchaseEvent(PurchaseEvent.Type.CREATED, newPurchase));
    }

    private void acceptReturnRequest(Request request, Car boughtCar, Client buyerClient) {

        /// management of return requests

        Purchase oldPurchase = purchaseRepository.findByCarAndClient(boughtCar, buyerClient).orElse(null);

        if (oldPurchase == null){
            throw new IllegalArgumentException("Purchase does not exist!");
        }

        boughtCar.setStock(boughtCar.getStock() + 1);

        if (boughtCar.getStock() == 1)
            messagingTemplate.convertAndSend("/topic/cars", new CarEvent(CarEvent.Type.CREATED, boughtCar));

        purchaseRepository.delete(oldPurchase);
        messagingTemplate.convertAndSend("/topic/purchases", new PurchaseEvent(PurchaseEvent.Type.DELETED, oldPurchase));
    }

    public void declineRequest(Request request) {

        /// if the admin decides to decline the request, it is deleted from the system

        delete(request);
        messagingTemplate.convertAndSend("/topic/requests", new RequestEvent(RequestEvent.Type.REJECTED, request));
    }

}




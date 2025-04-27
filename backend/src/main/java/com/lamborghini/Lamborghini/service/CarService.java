package com.lamborghini.Lamborghini.service;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.domain.Purchase;
import com.lamborghini.Lamborghini.domain.Request;
import com.lamborghini.Lamborghini.repository.CarRepository;
import com.lamborghini.Lamborghini.repository.PurchaseRepository;
import com.lamborghini.Lamborghini.repository.RequestRepository;
import com.lamborghini.Lamborghini.utils.CarEvent;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;
    private final RequestRepository requestRepository;
    private final PurchaseRepository purchaseRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public CarService(CarRepository carRepository, RequestRepository requestRepository, PurchaseRepository purchaseRepository, SimpMessagingTemplate messagingTemplate) {
        this.carRepository = carRepository;
        this.requestRepository = requestRepository;
        this.purchaseRepository = purchaseRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public void save(Car car) {

        /// if the car already exists in the database, the stock is incremented and the value is saved
        /// else, the new car is added in the database, and it's stock is one

        Optional<Car> databaseCar = findByModelYearPowerPrice(car.getModel(), car.getYear(), car.getHorsepower(), car.getPrice());

        if (databaseCar.isPresent()) {
            databaseCar.get().setStock(databaseCar.get().getStock() + 1);
            carRepository.save(databaseCar.get());
        }
        else {
            car.setStock(1);
            carRepository.save(car);
            messagingTemplate.convertAndSend("/topic/cars", new CarEvent(CarEvent.Type.CREATED, car));
        }
    }

    public void delete(Car car) {

        /// if the car exists in the database, its stock is decremented and the value is saved
        /// if the stock is 0, it manually deletes all requests that contains that car,
        /// and it deletes the car completely from the database if there are no purchases saved with the given car

        Car databaseCar = carRepository
                .findByModelAndYearAndHorsepowerAndPrice(car.getModel(), car.getYear(), car.getHorsepower(), car.getPrice())
                .orElseThrow(() -> new EntityNotFoundException("Car not found"));

        if(databaseCar.getStock() == 0){
            throw new IllegalArgumentException("Car cannot be deleted");
        }

        databaseCar.setStock(databaseCar.getStock() - 1);

        if(databaseCar.getStock() > 0){
            carRepository.save(databaseCar);
            return;
        }

        List<Request> carRequests = requestRepository.findAllByCar(databaseCar);
        requestRepository.deleteAll(carRequests);

        List<Purchase> carPurchases = purchaseRepository.findAllByCar(databaseCar);

        if(carPurchases.isEmpty()) {
            carRepository.delete(databaseCar);
        }
        else{
            carRepository.save(databaseCar);
        }
        messagingTemplate.convertAndSend("/topic/cars", new CarEvent(CarEvent.Type.DELETED, databaseCar));
    }

    public void update(Long id, Car updatedCar) {

        /// the function receives the id of the car that has to be updated
        /// and the updatedCar parameter that contains the new data
        /// it verifies that the car with the given id exists in the database
        /// and that there is no other car with the new specs
        /// if so, it updates the car in the database

        Optional<Car> optionalCar = carRepository.findById(id);

        if (optionalCar.isEmpty()) {
            throw new IllegalArgumentException("Car with id: " + id + " dose not exist");
        }

        Optional<Car> duplicateCar = findByModelYearPowerPrice(
                updatedCar.getModel(),
                updatedCar.getYear(),
                updatedCar.getHorsepower(),
                updatedCar.getPrice()
        );

        if (duplicateCar.isPresent() && !duplicateCar.get().getId().equals(id)) {
            throw new IllegalArgumentException("Car with given specifications already exist");
        }

        Car carToUpdate = optionalCar.get();

        carToUpdate.setModel(updatedCar.getModel());
        carToUpdate.setYear(updatedCar.getYear());
        carToUpdate.setHorsepower(updatedCar.getHorsepower());
        carToUpdate.setPrice(updatedCar.getPrice());

        carRepository.save(carToUpdate);
        messagingTemplate.convertAndSend("/topic/cars", new CarEvent(CarEvent.Type.UPDATED, carToUpdate));
    }

    public Optional<Car> findById(Long id) {

        /// returns the car with the given id from the database

        return carRepository.findById(id);
    }

    private Optional<Car> findByModelYearPowerPrice(String model, int year, int horsepower, int price){

        /// find the car with the specified parameters, unique in the database

        return carRepository.findByModelAndYearAndHorsepowerAndPrice(model, year, horsepower, price);
    }

    public List<Car> findAllValidStock() {

        /// find all cars in the database with stock greater than 0

        return carRepository.findAllByStockGreaterThan(0);
    }

    public List<Car> findAll(){

        /// find all cars in the database

        return carRepository.findAll();
    }

    public List<Car> filter(String model, Integer year, Integer horsepower, Integer price) {

        /// the method returns the cars with the given filters
        /// if one filter is null, the filtering does not take that into consideration

        String m = (model != null && !model.isBlank()) ? model : null;

        return carRepository.filter(
                m,
                year,
                horsepower,
                price
        );
    }

}






package com.lamborghini.Lamborghini.service;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
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
        }
    }

    public void delete(Car car) {

        /// if the car exists in the database, its stock is decremented and the value is saved
        /// else, the function throws and error

        Optional<Car> databaseCar = findByModelYearPowerPrice(car.getModel(), car.getYear(), car.getHorsepower(), car.getPrice());
        if (databaseCar.isPresent()) {

            databaseCar.get().setStock(databaseCar.get().getStock() - 1);
            if (databaseCar.get().getStock() == 0) {
                carRepository.delete(databaseCar.get());
            }
            else {
                carRepository.save(databaseCar.get());
            }
        }
        else{
            throw new IllegalArgumentException("Car dose not exist");
        }
    }


    private Optional<Car> findByModelYearPowerPrice(String model, int year, int horsepower, int price){

        /// find the car with the specified parameters, unique in the database

        return carRepository.findByModelAndYearAndHorsepowerAndPrice(model, year, horsepower, price);
    }

    public List<Car> findAll() {

        /// find all cars in the database

        return carRepository.findAll();
    }
}






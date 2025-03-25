package com.lamborghini.Lamborghini.service;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    private final CarRepository carRepository;

    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public void save(Car car) {
        carRepository.save(car);
    }

    public void delete(Car car) {
        carRepository.delete(car);
    }

    public List<Car> findByModelYearPowerPrice(String model, int year, int horsepower, int price){
        return carRepository.findByModelAndYearAndHorsepowerAndPrice(model, year, horsepower, price);
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }
}






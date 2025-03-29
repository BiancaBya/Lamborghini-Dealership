package com.lamborghini.Lamborghini.controllers;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveCar(@RequestBody Car car) {
        carService.save(car);
        return ResponseEntity.status(HttpStatus.CREATED).body("Car saved successfully.");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCar(@RequestBody Car car) {
        try {
            carService.delete(car);
            return ResponseEntity.ok("Car deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car does not exist.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Car>> findAllCars() {
        List<Car> cars = carService.findAll();
        return cars.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(cars);
    }

}




package com.lamborghini.Lamborghini.controllers;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCar(@PathVariable Long id, @RequestBody Car updatedCar) {
        try {
            carService.update(id, updatedCar);
            return ResponseEntity.ok("Car updated successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCar(@PathVariable Long id) {
        Optional<Car> car = carService.findById(id);
        return car.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @GetMapping
    public ResponseEntity<List<Car>> findAllCars() {
        List<Car> cars = carService.findAllValidStock();
        return cars.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(cars);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Car>> findAllStockCars() {
        List<Car> cars = carService.findAll();
        return cars.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(cars);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Car>> filter(
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer horsepower,
            @RequestParam(required = false) Integer price
    ) {
        List<Car> filteredCars = carService.filter(model, year, horsepower, price);
        return filteredCars.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(filteredCars);
    }

}





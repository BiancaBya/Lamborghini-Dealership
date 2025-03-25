package com.lamborghini.Lamborghini.repository;

import com.lamborghini.Lamborghini.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findByModelAndYearAndHorsepowerAndPrice(String model, int year, int horsepower, int price);
}




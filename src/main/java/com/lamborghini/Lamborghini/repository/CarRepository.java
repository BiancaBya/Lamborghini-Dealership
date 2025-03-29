package com.lamborghini.Lamborghini.repository;

import com.lamborghini.Lamborghini.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    @Query("SELECT c FROM Car c WHERE c.model = :model AND c.year = :year AND c.horsepower = :horsepower AND c.price = :price")
    Optional<Car> findByModelAndYearAndHorsepowerAndPrice(String model, int year, int horsepower, int price);

}




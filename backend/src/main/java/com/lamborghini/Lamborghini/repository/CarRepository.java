package com.lamborghini.Lamborghini.repository;

import com.lamborghini.Lamborghini.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    @Query("SELECT c FROM Car c WHERE c.model = :model AND c.year = :year AND c.horsepower = :horsepower AND c.price = :price")
    Optional<Car> findByModelAndYearAndHorsepowerAndPrice(String model, int year, int horsepower, int price);

    @Query("""
      SELECT c FROM Car c
       WHERE (:model IS NULL OR LOWER(c.model) LIKE CONCAT('%', LOWER(:model), '%'))
         AND (:year IS NULL  OR c.year = :year)
         AND (:hp IS NULL    OR c.horsepower = :hp)
         AND (:price IS NULL OR c.price = :price)
         AND (c.stock > 0)
    """)
    List<Car> filter(
            @Param("model") String model,
            @Param("year")  Integer year,
            @Param("hp")    Integer horsepower,
            @Param("price") Integer price
    );

    List<Car> findAllByStockGreaterThan(int stock);

}




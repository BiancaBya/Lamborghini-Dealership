package com.lamborghini.Lamborghini.repository;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.domain.Client;
import com.lamborghini.Lamborghini.domain.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findAllByClient(Client client);
    List<Purchase> findAllByCar(Car car);
    Optional<Purchase> findByCarAndClient(Car car, Client client);
    boolean existsByCarAndClient(Car car, Client client);
}





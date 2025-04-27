package com.lamborghini.Lamborghini.repository;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.domain.Client;
import com.lamborghini.Lamborghini.domain.Request;
import com.lamborghini.Lamborghini.domain.RequestType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    boolean existsByCarAndClientAndRequestType(Car car, Client client, RequestType requestType);
    Optional<Request> findByCarAndClientAndRequestType(Car car, Client client, RequestType requestType);
    List<Request> findAllByCar(Car car);
}





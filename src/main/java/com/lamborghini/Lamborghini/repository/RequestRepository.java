package com.lamborghini.Lamborghini.repository;

import com.lamborghini.Lamborghini.domain.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
}





package com.lamborghini.Lamborghini.repository;

import com.lamborghini.Lamborghini.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    public Optional<Admin> findByEmail(String email);
}



/*
save(): create or update
findById():
findAll():
deleteById():
delete():
count():
existsById(): verify the existence
 */




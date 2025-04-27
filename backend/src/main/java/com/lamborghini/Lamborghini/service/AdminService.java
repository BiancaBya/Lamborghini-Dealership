package com.lamborghini.Lamborghini.service;

import com.lamborghini.Lamborghini.domain.Admin;
import com.lamborghini.Lamborghini.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordService passwordService = new PasswordService();

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Optional<Admin> findByEmail(String email) {

        /// used for login to find the admin with the specified email
        /// to see id the password matches with the one stored in the database

        return adminRepository.findByEmail(email);
    }

    public void save(Admin admin) {

        /// before saving the admin, the password is encrypted for safety
        /// after that, the admin is saved to the database with the encrypted password

        String passwordEncoded = passwordService.hashPassword(admin.getPassword());
        admin.setPassword(passwordEncoded);
        adminRepository.save(admin);
    }

    public void delete(Admin admin) {

        /// deleting an admin

        adminRepository.delete(admin);
    }

    public List<Admin> findAll() {

        /// find all admins in the database

        return adminRepository.findAll();
    }

    public boolean existsByEmail(String email) {

        /// verifies if the admin with the given email exists in the database

        return adminRepository.existsByEmail(email);
    }
}





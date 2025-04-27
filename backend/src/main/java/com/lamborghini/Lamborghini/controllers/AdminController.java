package com.lamborghini.Lamborghini.controllers;

import com.lamborghini.Lamborghini.domain.Admin;
import com.lamborghini.Lamborghini.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveAdmin(@RequestBody Admin admin) {
        adminService.save(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body("Admin saved successfully.");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAdmin(@RequestBody Admin admin) {
        adminService.delete(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body("Admin deleted successfully.");
    }

    @GetMapping
    public ResponseEntity<List<Admin>> findAllAdmins() {
        List<Admin> admins = adminService.findAll();
        return admins.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(admins);
    }

}






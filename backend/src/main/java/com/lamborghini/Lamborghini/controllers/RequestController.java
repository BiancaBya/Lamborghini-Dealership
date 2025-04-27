package com.lamborghini.Lamborghini.controllers;

import com.lamborghini.Lamborghini.domain.Purchase;
import com.lamborghini.Lamborghini.domain.Request;
import com.lamborghini.Lamborghini.repository.RequestRepository;
import com.lamborghini.Lamborghini.service.RequestService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final RequestService requestService;

    @Autowired
    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveRequest(@RequestBody Request request) {
        try {
            requestService.save(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("Request saved successfully.");
        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteRequest(@RequestBody Request request) {
        try{
            requestService.delete(request);
            return ResponseEntity.ok("Request deleted successfully.");
        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requests = requestService.findAll();
        return requests.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(requests);
    }

    @PostMapping("/accept")
    public ResponseEntity<String> acceptRequest(@RequestBody Request request) {
        try {
            requestService.acceptRequest(request);
            return ResponseEntity.ok("Request accepted successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/decline")
    public ResponseEntity<String> declineRequest(@RequestBody Request request) {
        try {
            requestService.declineRequest(request);
            return ResponseEntity.ok("Request declined and deleted.");
        } catch (EntityNotFoundException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}




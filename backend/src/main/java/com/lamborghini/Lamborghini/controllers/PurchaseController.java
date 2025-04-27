package com.lamborghini.Lamborghini.controllers;

import com.lamborghini.Lamborghini.domain.Car;
import com.lamborghini.Lamborghini.domain.Client;
import com.lamborghini.Lamborghini.domain.Purchase;
import com.lamborghini.Lamborghini.service.ClientService;
import com.lamborghini.Lamborghini.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;
    private final ClientService clientService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService, ClientService clientService) {
        this.purchaseService = purchaseService;
        this.clientService = clientService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> savePurchase(@RequestBody Purchase purchase) {
        try {
            purchaseService.save(purchase);
            return ResponseEntity.status(HttpStatus.CREATED).body("Purchase saved successfully.");
        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deletePurchase(@RequestBody Purchase purchase) {
        try{
            purchaseService.delete(purchase);
            return ResponseEntity.ok("Purchase deleted successfully.");
        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Purchase>> getAllPurchases() {
        List<Purchase> purchases = purchaseService.findAll();
        return purchases.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(purchases);
    }

    @GetMapping
    public ResponseEntity<List<Purchase>> getPurchasesForClient(@RequestParam("clientId") Long clientId) {
        Client client = clientService.findById(clientId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));
        List<Purchase> purchases = purchaseService.findAllByClient(client);
        return purchases.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(purchases);
    }

    @GetMapping("/models")
    public ResponseEntity<List<String>> getModelsForClient(@RequestParam("clientId") Long clientId) {
        Client client = clientService.findById(clientId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));
        List<String> models = purchaseService.findModelsByClient(client);
        return models.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(models);
    }

}



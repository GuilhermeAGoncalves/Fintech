package com.fiap.fintech.controller;

import com.fiap.fintech.DTO.CreateTransactionDTO;
import com.fiap.fintech.service.TransactionsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionsController {

    private final TransactionsService transactionsService;

    @PostMapping("/create")
    public ResponseEntity<String> createTransaction(@RequestBody CreateTransactionDTO transactionData) {
        try {
            transactionsService.createTransaction(transactionData);
            return ResponseEntity.ok("Transaction created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating transaction: " + e.getMessage());
        }
    }

    @GetMapping("/{userid}")
    public ResponseEntity<?> getTransactionsByUser(@PathVariable String userid) {
        try {
            return ResponseEntity.ok(transactionsService.getTransactionsByUser(userid));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
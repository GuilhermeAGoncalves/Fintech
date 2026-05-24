package com.fiap.fintech.controller;

import com.fiap.fintech.model.Accounts;
import com.fiap.fintech.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@AllArgsConstructor
public class AccountsController {

    private final AccountService accountService;

    @GetMapping("/{userid}")
    public ResponseEntity<List<Accounts>> getAccountsByUser(@PathVariable String userid) {
        List<Accounts> accounts = accountService.getAccountsByUser(userid);
        return ResponseEntity.ok(accounts);
    }
    @PostMapping("/{userid}")
    public ResponseEntity<?> createAccount(@PathVariable String userid, @RequestBody Accounts account) {
        try {
            Accounts created = accountService.createAccount(userid, account);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/{accountId}")
    public ResponseEntity<?> updateAccount(@PathVariable String accountId, @RequestBody Accounts account) {
        try {
            Accounts updated = accountService.updateAccount(accountId, account);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<?> deleteAccount(@PathVariable String accountId) {
        try {
            accountService.deleteAccount(accountId);
            return ResponseEntity.ok("Account deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
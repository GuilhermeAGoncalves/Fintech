package com.fiap.fintech.controller;

import com.fiap.fintech.model.Accounts;
import com.fiap.fintech.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountsController {

    private final AccountService accountService;

    public AccountsController(AccountService accountService) {
        this.accountService = accountService;
    }

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
}
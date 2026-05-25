package com.fiap.fintech.controller;

import com.fiap.fintech.dto.UsersResponseDTO;
import com.fiap.fintech.model.Users;
import com.fiap.fintech.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UsersController {

    private final UsersService usersService;

    @GetMapping
    public ResponseEntity<List<UsersResponseDTO>> getAllUsers() {
        List<UsersResponseDTO> users = usersService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Users user) {
        try {
            UsersResponseDTO createdUser = usersService.saveUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
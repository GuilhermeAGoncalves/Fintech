package com.fiap.fintech.controller;

import com.fiap.fintech.DTO.LoginDTO;
import com.fiap.fintech.DTO.UsersResponseDTO;
import com.fiap.fintech.model.Users;
import com.fiap.fintech.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UsersController {

    private final UsersService usersService;

    @PostMapping("/login")
    public ResponseEntity<Users> validateUser(@RequestBody LoginDTO loginDTO) {
        Users isValid = usersService.validateUser(loginDTO);
        return ResponseEntity.ok(isValid);
    }

    @PostMapping("/register")
    public ResponseEntity<?> create(@RequestBody Users user) {
        try {
            UsersResponseDTO createdUser = usersService.saveUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<UsersResponseDTO>> getAllUsers() {
        List<UsersResponseDTO> users = usersService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
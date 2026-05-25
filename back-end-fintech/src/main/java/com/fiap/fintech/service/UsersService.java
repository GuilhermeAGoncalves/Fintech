package com.fiap.fintech.service;

import com.fiap.fintech.dto.UsersResponseDTO;
import com.fiap.fintech.model.Users;
import com.fiap.fintech.repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<UsersResponseDTO> getAllUsers() {
        return usersRepository.findAll()
                .stream()
                .map(user -> new UsersResponseDTO(
                        user.getUserid(),
                        user.getName(),
                        user.getEmail()
                ))
                .toList();
    }

    public Optional<Users> getUserById(String userid) {
        return usersRepository.findById(userid);
    }

    @Transactional
    public UsersResponseDTO saveUser(Users user) {
        if (usersRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        Users saved = usersRepository.save(user);
        return new UsersResponseDTO(
                saved.getUserid(),
                saved.getName(),
                saved.getEmail()
        );
    }
}
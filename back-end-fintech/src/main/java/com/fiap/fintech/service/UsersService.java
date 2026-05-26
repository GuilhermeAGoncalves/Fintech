package com.fiap.fintech.service;

import com.fiap.fintech.DTO.UsersResponseDTO;
import com.fiap.fintech.model.Users;
import com.fiap.fintech.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public List<UsersResponseDTO> getAllUsers() {
        return usersRepository.findAll()
                .stream()
                .map(user -> new UsersResponseDTO(
                        user.getUserid()
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
                saved.getUserid()
        );
    }

    public Boolean validateUserExist(String userId) {
        return usersRepository.existsById(userId);
    }

}

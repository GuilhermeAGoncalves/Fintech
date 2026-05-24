package com.fiap.fintech.service;


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

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Optional<Users> getUserById(String userid) {
        return usersRepository.findById(userid);
    }

    @Transactional
    public Users saveUser(Users user) {
        if (usersRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        return usersRepository.save(user);
    }

    public Boolean validateUserExist(String userId) {
        return usersRepository.existsById(userId);
    }

}

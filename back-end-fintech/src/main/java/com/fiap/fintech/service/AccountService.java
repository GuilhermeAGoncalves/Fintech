package com.fiap.fintech.service;

import com.fiap.fintech.model.Accounts;
import com.fiap.fintech.model.Users;
import com.fiap.fintech.repository.AccountsRepository;
import com.fiap.fintech.repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    private final AccountsRepository accountsRepository;
    private final UsersRepository usersRepository;

    public AccountService(AccountsRepository accountsRepository, UsersRepository usersRepository) {
        this.accountsRepository = accountsRepository;
        this.usersRepository = usersRepository;
    }

    public List<Accounts> getAccountsByUser(String userid) {
        return accountsRepository.findByUser_Userid(userid);
    }

    @Transactional
    public Accounts createAccount(String userid, Accounts account) {
        Users user = usersRepository.findById(userid)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        account.setUser(user);
        return accountsRepository.save(account);
    }
}
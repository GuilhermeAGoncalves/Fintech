package com.fiap.fintech.service;

import com.fiap.fintech.model.Accounts;
import com.fiap.fintech.model.Users;
import com.fiap.fintech.repository.AccountsRepository;
import com.fiap.fintech.repository.TransactionsRepository;
import com.fiap.fintech.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class AccountService {

    private final AccountsRepository accountsRepository;
    private final UsersRepository usersRepository;
    private final TransactionsRepository transactionsRepository;

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

    @Transactional
    public Accounts updateAccount(String accountId, Accounts account) {
        Accounts existing = accountsRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
        existing.setName(account.getName());
        existing.setInitialBalance(account.getInitialBalance());
        existing.setAccountType(account.getAccountType());
        existing.setColor(account.getColor());
        existing.setIsActive(account.getIsActive());
        return accountsRepository.save(existing);
    }

    @Transactional
    public void deleteAccount(String accountId) {
        if (!accountsRepository.existsById(accountId)) {
            throw new IllegalArgumentException("Account not found");
        }
        transactionsRepository.deleteByAccountId(accountId);
        accountsRepository.deleteById(accountId);
    }
}
package com.fiap.fintech.service;


import com.fiap.fintech.DTO.CreateTransactionDTO;
import com.fiap.fintech.model.Accounts;
import com.fiap.fintech.model.Categories;
import com.fiap.fintech.model.Transactions;
import com.fiap.fintech.model.Users;
import com.fiap.fintech.repository.AccountsRepository;
import com.fiap.fintech.repository.CategoriesRepository;
import com.fiap.fintech.repository.TransactionsRepository;
import com.fiap.fintech.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TransactionsService {

    private TransactionsRepository transactionRepository;
    private UsersRepository usersRepository;
    private AccountsRepository accountsRepository;
    private CategoriesRepository categoriesRepository;

    public List<Transactions> getTransactionsByUser(String userid) {
        try {
            return transactionRepository.findByUser_Userid(userid);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching transactions for user: " + userid, e);
        }
    }

    @Transactional
    public void createTransaction(CreateTransactionDTO transaction) {
        Users user = getUserById(transaction.userId());
        Accounts account = getAccountById(transaction.accountId());
        Categories category = getCategoryById(transaction.categoryId());

        Transactions newTransaction = new Transactions();
        newTransaction.setUser(user);
        newTransaction.setAccount(account);
        newTransaction.setCategory(category);
        newTransaction.setStatus(transaction.status());
        newTransaction.setAmount(transaction.amount());
        newTransaction.setDescription(transaction.description());
        newTransaction.setDtTransaction(transaction.dtTransaction());

        account.setInitialBalance(account.getInitialBalance().add(transaction.amount()));
        accountsRepository.save(account);

        transactionRepository.save(newTransaction);
    }

    public Users getUserById(String userId) {
        return usersRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public Accounts getAccountById(String accountId) {
        return accountsRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
    }

    public Categories getCategoryById(String categoryId) {
        return categoriesRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
    }


}

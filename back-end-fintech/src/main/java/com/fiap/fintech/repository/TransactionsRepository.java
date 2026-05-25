package com.fiap.fintech.repository;

import com.fiap.fintech.model.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, String> {

    List<Transactions> findByUser_Userid(String userid);

}

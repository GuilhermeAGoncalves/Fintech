package com.fiap.fintech.repository;

import com.fiap.fintech.model.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, String> {

    @Query("SELECT t FROM Transactions t WHERE t.User.userid = :userid")
    List<Transactions> findByUserId(@Param("userid") String userid);

}
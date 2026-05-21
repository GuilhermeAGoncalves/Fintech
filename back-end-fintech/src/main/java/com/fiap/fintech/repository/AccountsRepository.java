package com.fiap.fintech.repository;

import com.fiap.fintech.model.Accounts;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface AccountsRepository extends JpaRepository<Accounts, String > {
    List<Accounts> findByUser_Userid(String userid);


}

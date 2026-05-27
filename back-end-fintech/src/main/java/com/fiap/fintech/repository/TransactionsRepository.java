package com.fiap.fintech.repository;

import com.fiap.fintech.model.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< Updated upstream
=======
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
>>>>>>> Stashed changes
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, String> {

    List<Transactions> findByUser_Userid(String userid);

<<<<<<< Updated upstream
}
=======
    @Modifying
    @Query("DELETE FROM Transactions t WHERE t.Account.accountId = :accountId")
    void deleteByAccountId(@Param("accountId") String accountId);
}
>>>>>>> Stashed changes

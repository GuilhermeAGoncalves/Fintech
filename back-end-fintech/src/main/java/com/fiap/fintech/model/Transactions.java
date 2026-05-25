package com.fiap.fintech.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "FT_TRANSACTIONS")
@AllArgsConstructor
@NoArgsConstructor
public class Transactions {
    @Id
    @Column(name = "TRANSACTIONID", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String transactionId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "FT_CATEGORIES_CATEGORYID", nullable = false)
    private Categories Category;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "FT_USERS_USERID", nullable = false)
    private Users User;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "FT_ACCOUNTS_ACCOUNTID", nullable = false)
    private Accounts Account;

    @Column(name = "DESCRIPTION", nullable = false, length = 100)
    private String description;

    @Column(name = "AMOUNT", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "DTTRANSACTION", nullable = false)
    private LocalDateTime dtTransaction;

    @Column(name = "STATUS", nullable = false, length = 10)
    private String status;

}
package com.fiap.fintech.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "FT_ACCOUNTS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Accounts {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ACCOUNTID", length = 255)
    private String accountId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FT_USERS_USERID", nullable = false)
    private Users user;

    @Column(name = "NAME", length = 60, nullable = false)
    private String name;

    @Column(name = "INITIALBALANCE", precision = 10, scale = 2, nullable = false)
    private BigDecimal initialBalance;

    @Column(name = "ACCOUNTTYPE", length = 20, nullable = false)
    private String accountType;

    @Column(name = "COLOR", length = 20)
    private String color;

    @Column(name = "ISACTIVE", nullable = false)
    private Boolean isActive;

}

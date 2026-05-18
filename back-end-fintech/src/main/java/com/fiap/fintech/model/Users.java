package com.fiap.fintech.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "FT_USERS")
@AllArgsConstructor
@NoArgsConstructor
public class Users {


    @Id
    @Column(name = "USERID", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userid;

    @Column(name = "EMAIL", nullable = false, length = 100)
    private String email;

    @Column(name = "NAME", nullable = false, length = 60)
    private String name;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "CREATEDAT", nullable = false)
    private LocalDateTime createdat;

    @PrePersist
    protected void onCreate() {
        createdat = LocalDateTime.now();
    }

}
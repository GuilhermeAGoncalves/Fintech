package com.fiap.fintech.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "FT_CATEGORIES")
public class Categories {
    @Id
    @Column(name = "CATEGORYID", nullable = false)
    private String categoryid;

    @Column(name = "NAME", nullable = false, length = 60)
    private String name;

    @Column(name = "TYPE", nullable = false, length = 10)
    private String type;


}
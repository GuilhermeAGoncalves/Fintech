package com.fiap.fintech.model;

import com.fiap.fintech.Enum.CategoriesEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "FT_CATEGORIES")
@AllArgsConstructor
@NoArgsConstructor
public class Categories {

    @Id
    @Column(name = "CATEGORYID", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String categoryid;

    @Column(name = "NAME", nullable = false, length = 60)
    private String name;

    @Column(name = "TYPE", nullable = false, length = 10)
    private CategoriesEnum type;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "FT_USERS_USERID", nullable = false)
    private Users user;
}
package com.fiap.fintech.repository;

import com.fiap.fintech.Enum.CategoriesEnum;
import com.fiap.fintech.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, String> {

    List<Categories> findByType(CategoriesEnum type);
}

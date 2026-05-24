package com.fiap.fintech.service;

import com.fiap.fintech.model.Categories;
import com.fiap.fintech.repository.CategoriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriesService {

    private final CategoriesRepository categoryRepository;

    public CategoriesService(CategoriesRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Categories> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Categories createCategory(Categories category) {
        return categoryRepository.save(category);
    }

    public Categories updateCategory(String categoryId, Categories category) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new IllegalArgumentException("Category not found");
        }
        category.setCategoryid(categoryId);
        return categoryRepository.save(category);
    }

    public void deleteCategory(String categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new IllegalArgumentException("Category not found");
        }
        categoryRepository.deleteById(categoryId);
    }
}
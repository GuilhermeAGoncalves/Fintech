package com.fiap.fintech.service;

import com.fiap.fintech.DTO.CreateCategoriesDTO;
import com.fiap.fintech.model.Categories;
import com.fiap.fintech.model.Users;
import com.fiap.fintech.repository.CategoriesRepository;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CategoriesService {

    private final CategoriesRepository categoryRepository;
    private final UsersService usersService;

    public List<Categories> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Categories createCategory(CreateCategoriesDTO category) {
        Users user = usersService.getUserById(category.userId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Categories categories = new Categories();
        categories.setType(category.type());
        categories.setUser(user);
        categories.setName(category.name());

        return categoryRepository.save(categories);
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
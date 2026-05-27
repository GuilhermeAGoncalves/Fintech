package com.fiap.fintech.DTO;

import com.fiap.fintech.Enum.CategoriesEnum;

public record CreateCategoriesDTO(
        String userId,
        String name,
        CategoriesEnum type
) {
}

package com.fiap.fintech.DTO;


import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CreateTransactionDTO(
        String userId,
        String categoryId,
        String accountId,
        String description,
        BigDecimal amount,
        LocalDateTime dtTransaction,
        String status
) {
}

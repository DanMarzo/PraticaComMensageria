package com.br.danmarzo.produto.modules.category.dto;

import lombok.Data;

@Data
public class CategoryRequestDTO {
    private String description;

    public String getDescription() {
        return description;
    }
}

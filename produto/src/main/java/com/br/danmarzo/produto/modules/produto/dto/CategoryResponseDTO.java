package com.br.danmarzo.produto.modules.produto.dto;

import com.br.danmarzo.produto.modules.produto.model.CategoryEntity;
import org.springframework.beans.BeanUtils;

public class CategoryResponseDTO {
    private Integer id;
    private String description;

    public static CategoryResponseDTO of(CategoryEntity category){
        var response = new CategoryResponseDTO();
        BeanUtils.copyProperties(category, response);
        return response;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

package com.br.danmarzo.produto.modules.category.dto;

import com.br.danmarzo.produto.domain.CategoryEntity;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Data
public class CategoryResponseDTO {
    private Integer id;
    private String description;

    public static CategoryResponseDTO of(CategoryEntity category){
        var response = new CategoryResponseDTO();
        BeanUtils.copyProperties(category, response);
        return response;
    }
}

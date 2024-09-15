package com.br.danmarzo.produto.modules.product.dto;

import com.br.danmarzo.produto.domain.ProductEntity;
import lombok.Data;
import org.springframework.beans.BeanUtils;

@Data
public class ProductResponseDTO {
    private Integer id;
    private String name;

    public static ProductResponseDTO of(ProductEntity product){
        var response = new ProductResponseDTO();
        BeanUtils.copyProperties(product, response);
        return response;
    }
}


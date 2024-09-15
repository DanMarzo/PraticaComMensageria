package com.br.danmarzo.produto.modules.product.dto;

import lombok.Data;

@Data
public class ProductRequestDTO {
    private Integer id;
    private String name;
    private Integer quantityAvailable;
    private Integer supplierId;
    private Integer categoryId;
}

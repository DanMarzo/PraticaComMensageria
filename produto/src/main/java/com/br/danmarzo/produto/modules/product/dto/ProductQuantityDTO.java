package com.br.danmarzo.produto.modules.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductQuantityDTO {
    private Integer productId;
    private Integer quantity;
}

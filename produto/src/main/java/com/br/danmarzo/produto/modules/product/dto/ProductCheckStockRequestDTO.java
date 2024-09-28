package com.br.danmarzo.produto.modules.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCheckStockRequestDTO {
    List<ProductQuantityDTO> products;
}

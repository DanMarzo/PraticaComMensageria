package com.br.danmarzo.produto.modules.product.dto;

import com.br.danmarzo.produto.domain.ProductEntity;
import com.br.danmarzo.produto.modules.category.dto.CategoryResponseDTO;
import com.br.danmarzo.produto.modules.supplier.dto.SupplierResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private Integer id;
    private String name;
    private Integer quantityAvailable;
    private SupplierResponseDTO supplier;
    private CategoryResponseDTO category;

    public static ProductResponseDTO of(ProductEntity product){
        return ProductResponseDTO
                .builder()
                .id(product.getId())
                .name(product.getName())
                .quantityAvailable(product.getQuantityAvailable())
                .supplier(SupplierResponseDTO.of(product.getSupplier()))
                .category(CategoryResponseDTO.of(product.getCategory()))
                .build();
    }
}


package com.br.danmarzo.produto.modules.product.dto;

import com.br.danmarzo.produto.domain.ProductEntity;
import com.br.danmarzo.produto.modules.category.dto.CategoryResponseDTO;
import com.br.danmarzo.produto.modules.supplier.dto.SupplierResponseDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private Integer id;
    private String name;
    private Integer quantityAvailable;
    @JsonProperty("create_at")
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createAt;
    private SupplierResponseDTO supplier;
    private CategoryResponseDTO category;

    public static ProductResponseDTO of(ProductEntity product) {
        return ProductResponseDTO
                .builder()
                .id(product.getId())
                .name(product.getName())
                .quantityAvailable(product.getQuantityAvailable())
                .createAt(product.getCreateAt())
                .supplier(SupplierResponseDTO.of(product.getSupplier()))
                .category(CategoryResponseDTO.of(product.getCategory()))
                .build();
    }
}


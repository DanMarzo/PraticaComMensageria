package com.br.danmarzo.produto.domain;

import com.br.danmarzo.produto.modules.product.dto.ProductRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;

@Builder
//Cria GetterSetters
@Data
//Construtor Vazio
@NoArgsConstructor
//Construtor completo
@AllArgsConstructor
@Entity
@Table(name = "PRODUCTS")
@SequenceGenerator(allocationSize = 1, initialValue = 1, name = "products_seq_gen", sequenceName = "products_seq")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "products_seq_gen")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "FK_SUPPLIER", nullable = false)
    private SupplierEntity supplier;

    @ManyToOne
    @JoinColumn(name = "FK_CATEGORY", nullable = false)
    private CategoryEntity category;

    @Column(name = "quantity_available", nullable = false)
    private Integer quantityAvailable;

    @Column(name = "create_at", nullable = false, updatable = false)
    private LocalDateTime createAt;

    @PrePersist
    public void prePersist(){
        this.createAt = LocalDateTime.now();
    }

    public static ProductEntity of(ProductRequestDTO request, SupplierEntity supplier, CategoryEntity category){
        return ProductEntity
                .builder()
                .name(request.getName())
                .quantityAvailable(request.getQuantityAvailable())
                .category(category)
                .supplier(supplier)
                .build();
    }
}

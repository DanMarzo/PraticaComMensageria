package com.br.danmarzo.produto.domain;

import com.br.danmarzo.produto.modules.product.dto.ProductRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

//Cria GetterSetters
@Data
//Construtor Vazio
@NoArgsConstructor
//Construtor completo
@AllArgsConstructor
@Entity
@Table(name = "PRODUCTS")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
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

    public static ProductEntity of(ProductRequestDTO request){
        var response = new ProductEntity();
        BeanUtils.copyProperties(request, response);
        return response;
    }
}

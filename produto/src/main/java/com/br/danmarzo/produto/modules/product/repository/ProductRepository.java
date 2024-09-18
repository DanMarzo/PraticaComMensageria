package com.br.danmarzo.produto.modules.product.repository;

import com.br.danmarzo.produto.domain.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository  extends JpaRepository<ProductEntity, Integer> {
    List<ProductEntity> findByNameIgnoreCaseContaining(String name);
    List<ProductEntity> findByCategoryId(Integer id);
    List<ProductEntity> findBySupplierId(Integer id);
}

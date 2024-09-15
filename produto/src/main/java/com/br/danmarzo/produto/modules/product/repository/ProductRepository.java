package com.br.danmarzo.produto.modules.product.repository;

import com.br.danmarzo.produto.domain.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository  extends JpaRepository<ProductEntity, Integer> {
}

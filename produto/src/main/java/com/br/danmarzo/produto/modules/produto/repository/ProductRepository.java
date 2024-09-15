package com.br.danmarzo.produto.modules.produto.repository;

import com.br.danmarzo.produto.modules.produto.model.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository  extends JpaRepository<ProductEntity, Integer> {
}

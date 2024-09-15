package com.br.danmarzo.produto.modules.produto.repository;

import com.br.danmarzo.produto.modules.produto.model.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
}

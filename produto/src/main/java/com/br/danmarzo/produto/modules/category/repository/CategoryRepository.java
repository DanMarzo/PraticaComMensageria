package com.br.danmarzo.produto.modules.category.repository;

import com.br.danmarzo.produto.domain.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
}

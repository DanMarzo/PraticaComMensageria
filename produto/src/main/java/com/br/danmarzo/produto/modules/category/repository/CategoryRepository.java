package com.br.danmarzo.produto.modules.category.repository;

import com.br.danmarzo.produto.domain.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
    //A Consulta é montada com base na forma como e declarada o nome do metodo
    List<CategoryEntity> findByDescriptionIgnoreCaseContaining(String description);

    boolean existsById(Integer id);
}

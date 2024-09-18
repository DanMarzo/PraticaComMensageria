package com.br.danmarzo.produto.modules.supplier.repository;

import com.br.danmarzo.produto.domain.SupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<SupplierEntity, Integer> {
    List<SupplierEntity> findByNameIgnoreCaseContaining(String name);
}

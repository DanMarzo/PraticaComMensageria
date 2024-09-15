package com.br.danmarzo.produto.modules.produto.repository;

import com.br.danmarzo.produto.modules.produto.model.SupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<SupplierEntity, Integer> {
}

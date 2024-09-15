package com.br.danmarzo.produto.modules.supplier.service;

import com.br.danmarzo.produto.config.exception.ValidationException;
import com.br.danmarzo.produto.domain.SupplierEntity;
import com.br.danmarzo.produto.modules.supplier.dto.SupplierRequestDTO;
import com.br.danmarzo.produto.modules.supplier.dto.SupplierResponseDTO;
import com.br.danmarzo.produto.modules.supplier.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public SupplierResponseDTO save(SupplierRequestDTO request){
        this.validateCategoryNameInformed(request);
        var category = this.supplierRepository.save(SupplierEntity.of(request));
        return SupplierResponseDTO.of(category);
    }

    public void validateCategoryNameInformed(SupplierRequestDTO requestDTO){
        if (isEmpty(requestDTO.getName())){
            throw new ValidationException("The category description was not informed.");
        }
    }
}

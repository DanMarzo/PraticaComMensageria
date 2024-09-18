package com.br.danmarzo.produto.modules.supplier.service;

import com.br.danmarzo.produto.config.exception.ValidationException;
import com.br.danmarzo.produto.domain.SupplierEntity;
import com.br.danmarzo.produto.modules.supplier.dto.SupplierRequestDTO;
import com.br.danmarzo.produto.modules.supplier.dto.SupplierResponseDTO;
import com.br.danmarzo.produto.modules.supplier.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public List<SupplierResponseDTO> findByName(String name){
        if (isEmpty(name)){
            throw new ValidationException("The supplier name must be informed");
        }
        return this
                .supplierRepository
                .findByNameIgnoreCaseContaining(name)
                .stream()
                .map(SupplierResponseDTO::of)
                .collect(Collectors.toList());
    }

    public List<SupplierResponseDTO> findAll(){
        return this
                .supplierRepository
                .findAll()
                .stream()
                .map(SupplierResponseDTO::of)
                .collect(Collectors.toList());
    }

    public SupplierResponseDTO findByIdResponse(Integer id){
        return SupplierResponseDTO.of(this.findById(id));
    }

    public SupplierResponseDTO save(SupplierRequestDTO request){
        this.validateSupplierNameInformed(request);
        var category = this.supplierRepository.save(SupplierEntity.of(request));
        return SupplierResponseDTO.of(category);
    }

    public void validateSupplierNameInformed(SupplierRequestDTO requestDTO){
        if (isEmpty(requestDTO.getName())){
            throw new ValidationException("The supplier name was not informed.");
        }
    }
    public SupplierEntity findById(Integer id){
        if(isEmpty(id)){
            throw new ValidationException("ID was not provided");
        }
        return this
                .supplierRepository
                .findById(id)
                .orElseThrow(() -> new ValidationException("There's no supplier for the given ID."));
    }
}

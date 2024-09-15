package com.br.danmarzo.produto.modules.supplier.dto;

import com.br.danmarzo.produto.domain.ProductEntity;
import com.br.danmarzo.produto.domain.SupplierEntity;
import com.br.danmarzo.produto.modules.product.dto.ProductResponseDTO;
import lombok.Data;
import org.springframework.beans.BeanUtils;

@Data
public class SupplierResponseDTO {
    private Integer id;
    private String name;


    public static SupplierResponseDTO of(SupplierEntity supplier){
        var response = new SupplierResponseDTO();
        BeanUtils.copyProperties(supplier, response);
        return response;
    }
}

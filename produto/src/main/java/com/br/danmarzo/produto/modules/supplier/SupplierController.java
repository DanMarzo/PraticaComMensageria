package com.br.danmarzo.produto.modules.supplier;

import com.br.danmarzo.produto.modules.supplier.dto.SupplierRequestDTO;
import com.br.danmarzo.produto.modules.supplier.dto.SupplierResponseDTO;
import com.br.danmarzo.produto.modules.supplier.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;


    @PostMapping("registrar")
    public SupplierResponseDTO registrar(@RequestBody SupplierRequestDTO request){
        return this.supplierService.save(request);
    }
}

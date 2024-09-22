package com.br.danmarzo.produto.modules.supplier.controller;

import com.br.danmarzo.produto.config.exception.SuccessResponse;
import com.br.danmarzo.produto.modules.supplier.dto.SupplierRequestDTO;
import com.br.danmarzo.produto.modules.supplier.dto.SupplierResponseDTO;
import com.br.danmarzo.produto.modules.supplier.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @PostMapping("registrar")
    public SupplierResponseDTO registrar(@RequestBody SupplierRequestDTO request){
        return this.supplierService.save(request);
    }

    @GetMapping("findAll")
    public List<SupplierResponseDTO> findAll(){
        return this.supplierService.findAll();
    }
    @GetMapping("findByName")
    public List<SupplierResponseDTO> findByName(@RequestParam() String name){
        return this.supplierService.findByName(name);
    }
    @GetMapping("findById")
    public SupplierResponseDTO findById(@RequestParam() Integer id){
        return this.supplierService.findByIdResponse(id);
    }
    @DeleteMapping("delete")
    public SuccessResponse delete(@RequestParam() Integer id){
        return this.supplierService.delete(id);
    }
}

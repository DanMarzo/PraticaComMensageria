package com.br.danmarzo.produto.modules.product.controller;

import com.br.danmarzo.produto.config.exception.SuccessResponse;
import com.br.danmarzo.produto.modules.product.dto.ProductRequestDTO;
import com.br.danmarzo.produto.modules.product.dto.ProductResponseDTO;
import com.br.danmarzo.produto.modules.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("registrar")
    public ProductResponseDTO save(@RequestBody ProductRequestDTO request){
        return this.productService.save(request);
    }
    @PutMapping("update")
    public ProductResponseDTO save(@RequestParam() Integer id, @RequestBody ProductRequestDTO request){
        return this.productService.update(request, id);
    }

    @GetMapping("findAll")
    public List<ProductResponseDTO> findAll(){
        return this.productService.findAll();
    }
    @GetMapping("findByName")
    public List<ProductResponseDTO> findByName(@RequestParam() String name){
        return this.productService.findByName(name);
    }
    @GetMapping("findById")
    public ProductResponseDTO findById(@RequestParam() Integer id){
        return this.productService.findByIdResponse(id);
    }
    @GetMapping("findBySupplierId")
    public List<ProductResponseDTO> findBySupplierId(@RequestParam() Integer id){
        return this.productService.findBySupplierId(id);
    }
    @GetMapping("findByCategoryId")
    public List<ProductResponseDTO> findByCategoryId(@RequestParam() Integer id){
        return this.productService.findByCategoryId(id);
    }

    @DeleteMapping("delete")
    public SuccessResponse delete(@RequestParam() Integer id){
        return this.productService.delete(id);
    }

    @GetMapping("{productId}/sales")
    public
}

package com.br.danmarzo.produto.modules.product.controller;

import com.br.danmarzo.produto.modules.product.dto.ProductRequestDTO;
import com.br.danmarzo.produto.modules.product.dto.ProductResponseDTO;
import com.br.danmarzo.produto.modules.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("registrar")
    public ProductResponseDTO save(@RequestBody ProductRequestDTO request){
        return this.productService.save(request);
    }
}

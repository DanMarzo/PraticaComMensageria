package com.br.danmarzo.produto.modules.product.service;

import com.br.danmarzo.produto.modules.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
}

package com.br.danmarzo.produto.modules.product.service;

import com.br.danmarzo.produto.config.exception.ValidationException;
import com.br.danmarzo.produto.domain.ProductEntity;
import com.br.danmarzo.produto.modules.category.service.CategoryService;
import com.br.danmarzo.produto.modules.product.dto.ProductRequestDTO;
import com.br.danmarzo.produto.modules.product.dto.ProductResponseDTO;
import com.br.danmarzo.produto.modules.product.repository.ProductRepository;
import com.br.danmarzo.produto.modules.supplier.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierService supplierService;
    @Autowired
    private CategoryService categoryService;


    public ProductResponseDTO save(ProductRequestDTO request){
        this.validateCategoryAndSupplierId(request);
        this.validateProductDataInformed(request);
        var category = this.categoryService.findById(request.getCategoryId());
        var supplier = this.supplierService.findById(request.getSupplierId());
        var product = this.productRepository.save(ProductEntity.of(request, supplier, category));
        return ProductResponseDTO.of(product);
    }

    private void validateProductDataInformed(ProductRequestDTO request) {
        if (isEmpty(request.getName())){
            throw new ValidationException("The product name was not informed.");
        }
        if (isEmpty(request.getQuantityAvailable())){
            throw new ValidationException("The product's quantity was not informed.");
        }
    }
    private void validateCategoryAndSupplierId(ProductRequestDTO request) {
        if (isEmpty(request.getCategoryId())){
            throw new ValidationException("The category id was not informed.");
        }
        if (isEmpty(request.getSupplierId())){
            throw new ValidationException("The supplier id was not informed.");
        }
    }
}

package com.br.danmarzo.produto.modules.product.service;

import com.br.danmarzo.produto.config.exception.SuccessResponse;
import com.br.danmarzo.produto.config.exception.ValidationException;
import com.br.danmarzo.produto.domain.ProductEntity;
import com.br.danmarzo.produto.modules.category.service.CategoryService;
import com.br.danmarzo.produto.modules.product.dto.ProductRequestDTO;
import com.br.danmarzo.produto.modules.product.dto.ProductResponseDTO;
import com.br.danmarzo.produto.modules.product.repository.ProductRepository;
import com.br.danmarzo.produto.modules.supplier.dto.SupplierResponseDTO;
import com.br.danmarzo.produto.modules.supplier.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierService supplierService;
    @Autowired
    private CategoryService categoryService;

    public List<ProductResponseDTO> findByName(String name){
        if (isEmpty(name)){
            throw new ValidationException("The product name must be informed");
        }
        return this
                .productRepository
                .findByNameIgnoreCaseContaining(name)
                .stream()
                .map(ProductResponseDTO::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponseDTO> findAll(){
        return this
                .productRepository
                .findAll()
                .stream()
                .map(ProductResponseDTO::of)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO findByIdResponse(Integer id){
        return ProductResponseDTO.of(this.findById(id));
    }

    public ProductEntity findById(Integer id){
        if(isEmpty(id)){
            throw new ValidationException("Id must be informed");
        }
        return this
                .productRepository
                .findById(id)
                .orElseThrow(() -> new ValidationException("There's no product for the given ID."));
    }

    public ProductResponseDTO save(ProductRequestDTO request){
        this.validateCategoryAndSupplierId(request);
        this.validateProductDataInformed(request);
        var category = this.categoryService.findById(request.getCategoryId());
        var supplier = this.supplierService.findById(request.getSupplierId());
        var product = this.productRepository.save(ProductEntity.of(request, supplier, category));
        return ProductResponseDTO.of(product);
    }

    public List<ProductResponseDTO> findByCategoryId(Integer id){
        if(isEmpty(id)){
            throw new ValidationException("Id category must be informed.");
        }
        return this
                .productRepository
                .findByCategoryId(id)
                .stream()
                .map(ProductResponseDTO::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponseDTO> findBySupplierId(Integer id){
        if(isEmpty(id)){
            throw new ValidationException("Id supplier must be informed.");
        }
        return this
                .productRepository
                .findBySupplierId(id)
                .stream()
                .map(ProductResponseDTO::of)
                .collect(Collectors.toList());
    }

    public Boolean existsByCategoryId(Integer id){
        return this.productRepository.existsByCategoryId(id);
    }

    public Boolean existsBySupplierId(Integer id){
        return this.productRepository.existsBySupplierId(id);
    }

    public SuccessResponse delete(Integer id){
        this.validateProductIdInformed(id);
        this.productRepository.deleteById(id);
        return SuccessResponse.create("The product was deleted.");
    }

    private void validateProductIdInformed(Integer id){
        if (isEmpty(id)){
            throw new ValidationException("Product id must be informed.");
        }
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

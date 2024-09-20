package com.br.danmarzo.produto.modules.category.service;

import com.br.danmarzo.produto.config.exception.SuccessResponse;
import com.br.danmarzo.produto.config.exception.ValidationException;
import com.br.danmarzo.produto.modules.category.dto.CategoryRequestDTO;
import com.br.danmarzo.produto.modules.category.dto.CategoryResponseDTO;
import com.br.danmarzo.produto.domain.CategoryEntity;
import com.br.danmarzo.produto.modules.category.repository.CategoryRepository;
import com.br.danmarzo.produto.modules.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductService productService;

    public List<CategoryResponseDTO> findByDescription(String description){
        if (isEmpty(description)){
            throw new ValidationException("The category description must be informed");
        }
        return this
                .categoryRepository
                .findByDescriptionIgnoreCaseContaining(description)
                .stream()
                .map(CategoryResponseDTO::of)
                .collect(Collectors.toList());
    }

    public List<CategoryResponseDTO> findAll(){
        return this
                .categoryRepository
                .findAll()
                .stream()
                .map(CategoryResponseDTO::of)
                .collect(Collectors.toList());
    }

    public CategoryResponseDTO findByIdResponse(Integer id){
        return CategoryResponseDTO.of(this.findById(id));
    }

    public CategoryResponseDTO save(CategoryRequestDTO request){
        this.validateCategoryNameInformed(request);
        var category = this.categoryRepository.save(CategoryEntity.of(request));
        return CategoryResponseDTO.of(category);
    }

    public void validateCategoryNameInformed(CategoryRequestDTO requestDTO){
        if (isEmpty(requestDTO.getDescription())){
            throw new ValidationException("The category description was not informed.");
        }
    }

    public CategoryEntity findById(Integer id){
        this.validateInformedId(id);
        return this
                .categoryRepository
                .findById(id)
                .orElseThrow(() -> new ValidationException("There's no category for the given ID."));
    }

    public Boolean existsByCategoryId(Integer id){
        return this.categoryRepository.existsByCategoryId(id);
    }
    public SuccessResponse delete(Integer id){
        this.validateInformedId(id);
        var existsProductsUsing = this.productService.existsByCategoryId(id);
        if (existsProductsUsing) {
            throw new ValidationException("You cannot delete this category because it's already defined by a product.");
        }
        this.categoryRepository.deleteById(id);
        return SuccessResponse.create("The category was deleted.");
    }
    public void validateInformedId(Integer id){
        if(isEmpty(id)){
            throw new ValidationException("The category id must be informed");
        }
    }
}

package com.br.danmarzo.produto.modules.category.service;

import com.br.danmarzo.produto.config.exception.ValidationException;
import com.br.danmarzo.produto.modules.category.dto.CategoryRequestDTO;
import com.br.danmarzo.produto.modules.category.dto.CategoryResponseDTO;
import com.br.danmarzo.produto.domain.CategoryEntity;
import com.br.danmarzo.produto.modules.category.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

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
        return this
                .categoryRepository
                .findById(id)
                .orElseThrow(() -> new ValidationException("There's no category for the given ID."));
    }
}

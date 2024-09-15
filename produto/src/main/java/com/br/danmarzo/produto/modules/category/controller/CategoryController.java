package com.br.danmarzo.produto.modules.category.controller;

import com.br.danmarzo.produto.modules.category.dto.CategoryRequestDTO;
import com.br.danmarzo.produto.modules.category.dto.CategoryResponseDTO;
import com.br.danmarzo.produto.modules.category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping(name = "registrar")
    public CategoryResponseDTO save(@RequestBody() CategoryRequestDTO request){
        return this.categoryService.save(request);
    }
}

package com.br.danmarzo.produto.modules.produto.controller;

import com.br.danmarzo.produto.modules.produto.dto.CategoryRequestDTO;
import com.br.danmarzo.produto.modules.produto.dto.CategoryResponseDTO;
import com.br.danmarzo.produto.modules.produto.service.CategoryService;
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

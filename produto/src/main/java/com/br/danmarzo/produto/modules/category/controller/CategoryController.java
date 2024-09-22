package com.br.danmarzo.produto.modules.category.controller;

import com.br.danmarzo.produto.config.exception.SuccessResponse;
import com.br.danmarzo.produto.modules.category.dto.CategoryRequestDTO;
import com.br.danmarzo.produto.modules.category.dto.CategoryResponseDTO;
import com.br.danmarzo.produto.modules.category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("registrar")
    public CategoryResponseDTO save(@RequestBody() CategoryRequestDTO request){
        return this.categoryService.save(request);
    }

    @GetMapping("findAll")
    public List<CategoryResponseDTO> findAll(){
        return this.categoryService.findAll();
    }
    @GetMapping("findById")
    public CategoryResponseDTO findById(@RequestParam() Integer id){
        return this.categoryService.findByIdResponse(id);
    }

    @GetMapping("description")
    public List<CategoryResponseDTO> findByDescription(@RequestParam() String description){
        return this.categoryService.findByDescription(description);
    }

    @DeleteMapping("delete")
    public SuccessResponse delete(@RequestParam() Integer id){
        return this.categoryService.delete(id);
    }
}

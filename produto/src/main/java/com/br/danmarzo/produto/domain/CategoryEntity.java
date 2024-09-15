package com.br.danmarzo.produto.domain;

import com.br.danmarzo.produto.modules.category.dto.CategoryRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

//Cria GetterSetters
@Data
//Construtor Vazio
@NoArgsConstructor
//Construtor completo
@AllArgsConstructor
@Entity
@Table(name = "CATEGORIES")
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "description", nullable = false)
    private String description;

    public  static  CategoryEntity of(CategoryRequestDTO request){
        var category = new CategoryEntity();
        BeanUtils.copyProperties(request, category);
        return  category;
    }
}

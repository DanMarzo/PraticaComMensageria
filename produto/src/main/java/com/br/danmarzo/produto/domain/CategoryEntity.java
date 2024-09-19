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
@SequenceGenerator(allocationSize = 1, initialValue = 1, name = "categories_seq_gen", sequenceName = "categories_seq")
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categories_seq_gen")
    private Integer id;

    @Column(name = "description", nullable = false)
    private String description;

    public  static  CategoryEntity of(CategoryRequestDTO request){
        var category = new CategoryEntity();
        BeanUtils.copyProperties(request, category);
        return  category;
    }
}

package com.br.danmarzo.produto.domain;

import com.br.danmarzo.produto.modules.supplier.dto.SupplierRequestDTO;
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
@Table(name = "SUPPLIERS")
public class SupplierEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    public static SupplierEntity of(SupplierRequestDTO request) {
        var response = new SupplierEntity();
        BeanUtils.copyProperties(request, response);
        return response;
    }
}

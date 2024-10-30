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
@SequenceGenerator(allocationSize = 1, initialValue = 1, name = "suppliers_seq_gen", sequenceName = "suppliers_seq")
public class SupplierEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "suppliers_seq_gen")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    public static SupplierEntity of(SupplierRequestDTO request) {
        var response = new SupplierEntity();
        BeanUtils.copyProperties(request, response);
        return response;
    }
}

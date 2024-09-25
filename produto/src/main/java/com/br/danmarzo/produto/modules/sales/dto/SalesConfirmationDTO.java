package com.br.danmarzo.produto.modules.sales.dto;

import com.br.danmarzo.produto.modules.sales.enums.SalesStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesConfirmationDTO {
    private String salesId;
    private SalesStatusEnum status;
}

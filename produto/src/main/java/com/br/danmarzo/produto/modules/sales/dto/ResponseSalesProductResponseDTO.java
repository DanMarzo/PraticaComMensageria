package com.br.danmarzo.produto.modules.sales.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseSalesProductResponseDTO {
    private List<String> sales;
}

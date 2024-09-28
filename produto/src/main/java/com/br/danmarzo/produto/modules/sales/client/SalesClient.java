package com.br.danmarzo.produto.modules.sales.client;

import com.br.danmarzo.produto.modules.sales.dto.ResponseSalesProductResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(
        name = "salesClient",
        contextId = "salesClient",
        url = "${app-config.services.sales}"
)
public interface SalesClient {

    @GetMapping("api/products/{productId}")
    Optional<ResponseSalesProductResponseDTO> findSalesByProductId(@PathVariable Integer productId);

}

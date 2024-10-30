package com.br.danmarzo.produto.modules.product.controller;

import com.br.danmarzo.produto.config.exception.SuccessResponse;
import com.br.danmarzo.produto.modules.product.dto.ProductCheckStockRequestDTO;
import com.br.danmarzo.produto.modules.product.dto.ProductRequestDTO;
import com.br.danmarzo.produto.modules.product.dto.ProductResponseDTO;
import com.br.danmarzo.produto.modules.product.dto.ProductSalesResponseDTO;
import com.br.danmarzo.produto.modules.product.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.br.danmarzo.produto.config.interceptor.RequestUtil.getCurrentRequest;

@Slf4j
@RestController
@RequestMapping("api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("registrar")
    public ProductResponseDTO save(@RequestBody ProductRequestDTO request) {
        return this.productService.save(request);
    }

    @PutMapping("update")
    public ProductResponseDTO save(@RequestParam() Integer id, @RequestBody ProductRequestDTO request) {
        return this.productService.update(request, id);
    }

    @GetMapping("findAll")
    public List<ProductResponseDTO> findAll() {
        return this.productService.findAll();
    }

    @GetMapping("findByName")
    public List<ProductResponseDTO> findByName(@RequestParam() String name) {
        return this.productService.findByName(name);
    }

    @GetMapping("findById")
    public ProductResponseDTO findById(@RequestParam() Integer id) {
        return this.productService.findByIdResponse(id);
    }

    @GetMapping("findBySupplierId")
    public List<ProductResponseDTO> findBySupplierId(@RequestParam() Integer id) {
        return this.productService.findBySupplierId(id);
    }

    @GetMapping("findByCategoryId")
    public List<ProductResponseDTO> findByCategoryId(@RequestParam() Integer id) {
        return this.productService.findByCategoryId(id);
    }

    @DeleteMapping("delete")
    public SuccessResponse delete(@RequestParam() Integer id) {
        return this.productService.delete(id);
    }

    @PostMapping("check-stock")
    public SuccessResponse checkProductStock(@RequestBody ProductCheckStockRequestDTO checkStockRequest) throws JsonProcessingException {
        var currentRequest = getCurrentRequest();
        log.info("Request to Post check-stock with data: {} | [Transactionid: {} | ServiceId: {}]",
                new ObjectMapper().writeValueAsString(checkStockRequest),
                currentRequest.getHeader("transactionid"),
                currentRequest.getHeader("serviceid")
        );
        SuccessResponse response = this.productService.CheckStock(checkStockRequest);
        log.info("Response to Post check-stock with data: {} | [TransactionId: {} | ServiceId: {}]",
                new ObjectMapper().writeValueAsString(response),
                currentRequest.getHeader("transactionid"),
                currentRequest.getHeader("serviceid")
        );
        return response;
    }

    @GetMapping("{id}/sales")
    public ProductSalesResponseDTO findProductSales(@PathVariable Integer id) {
        return productService.findProductSales(id);
    }
}

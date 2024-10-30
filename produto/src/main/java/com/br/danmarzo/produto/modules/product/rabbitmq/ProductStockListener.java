package com.br.danmarzo.produto.modules.product.rabbitmq;

import com.br.danmarzo.produto.modules.product.dto.ProductStockDTO;
import com.br.danmarzo.produto.modules.product.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ProductStockListener {

    @Autowired
    private ProductService productService;

    //Menino que vai ouvir
    @RabbitListener(queues = "${app-config.rabbit.queue.product-stock}")
    public void receiveProductStock(ProductStockDTO product) throws JsonProcessingException {
        log.info("Receiving message with data: {} | [Transactionid: {}]", new ObjectMapper().writeValueAsString(product), product.getTransactionId());
        this.productService.updateProductStock(product);
    }
}

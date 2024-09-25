package com.br.danmarzo.produto.modules.product.rabbitmq;

import com.br.danmarzo.produto.modules.product.dto.ProductStockDTO;
import com.br.danmarzo.produto.modules.product.service.ProductService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
public class ProductStockListener {

    @Autowired private ProductService productService;

    //Menino que vai ouvir
    @RabbitListener(queues = "${app-config.rabbit.queue.product-stock}" )
    public void receiveProductStock(@Payload ProductStockDTO product){
        System.out.println("aaa");
    //this.productService.updateProductStock(product);
    }
}

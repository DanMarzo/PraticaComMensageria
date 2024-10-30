package com.br.danmarzo.produto.modules.sales.rabbitmq;

import com.br.danmarzo.produto.modules.sales.dto.SalesConfirmationDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SalesConfirmationSender {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${app-config.rabbit.exchange}")
    private String productTopicExchange;
    @Value("${app-config.rabbit.routingKey.sales-confirmation}")
    private String salesConfirmationKey;

    public void sendSalesConfirmationMessage(SalesConfirmationDTO message) {
        try {
            log.info("Sending message");
            log.info(new ObjectMapper().writeValueAsString(message));
            this.rabbitTemplate.convertAndSend(productTopicExchange, salesConfirmationKey, message);
        } catch (Exception e) {
            log.info("Error while trying send message sales confirmation message", e);
        }
    }
}

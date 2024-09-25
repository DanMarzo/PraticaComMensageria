package com.br.danmarzo.produto.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    @Value("${app-config.rabbit.exchange}")
    private String productTopicExchange;
    @Value("${app-config.rabbit.routingKey.product-stock}")
    private String productStackKey;
    @Value("${app-config.rabbit.routingKey.sales-confirmation}")
    private String salesConfirmationKey;
    @Value("${app-config.rabbit.queue.product-stock}")
    private String productStackMq;
    @Value("${app-config.rabbit.queue.sales-confirmation}")
    private String salesConfirmationMq;

    @Bean
    public TopicExchange productTopicExchange(){
        System.out.println(productTopicExchange);
        return new TopicExchange(productTopicExchange);
    }

    @Bean
    public Queue productStockMq(){
        System.out.println(productStackMq);
        return new Queue(productStackMq, true);
    }

    @Bean
    public Queue saleConfirmationMq(){
        System.out.println(salesConfirmationMq);
        return new Queue(salesConfirmationMq, true);
    }

    @Bean
    public Binding productStockMqBinding(TopicExchange topicExchange){
        System.out.println("Product Stock Binding");
        return BindingBuilder
                .bind(this.productStockMq())
                .to(topicExchange)
                .with(productStackKey);
    }
    @Bean
    public Binding salesConfirmationMqBinding(TopicExchange topicExchange){
        System.out.println("Sales confirmation Binding");
        return BindingBuilder
                .bind(saleConfirmationMq())
                .to(topicExchange)
                .with(salesConfirmationKey);
    }

    @Bean
    public MessageConverter jsonMessageConverter()
    {
        return new Jackson2JsonMessageConverter();
    }

}
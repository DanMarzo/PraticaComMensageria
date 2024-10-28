package com.br.danmarzo.produto.config.interceptor;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.stereotype.Component;

import static com.br.danmarzo.produto.config.interceptor.RequestUtil.getCurrentRequest;

@Component
public class FeingClientInterceptor implements RequestInterceptor {
    private static final String Authorization = "Authorization";
    private static final String TRANSACTION_ID = "transactionid";

    @Override
    public void apply(RequestTemplate template) {
        var httpRequest = getCurrentRequest();
        var token = httpRequest.getHeader(Authorization);
        template.header(Authorization, token);
        template.header(TRANSACTION_ID, httpRequest.getHeader(TRANSACTION_ID));
    }


}

package com.br.danmarzo.produto.config.interceptor;

import com.br.danmarzo.produto.config.exception.ValidationException;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class FeingClientInterceptor  implements RequestInterceptor {
    private static final String Authorization = "Authorization";

    @Override
    public void apply(RequestTemplate template) {
        var httpRequest = this.getCurrentRequest();
        var token = httpRequest.getHeader(Authorization);
        template.header(Authorization, token);
    }

    private HttpServletRequest getCurrentRequest(){
        try {
            var req =((ServletRequestAttributes)RequestContextHolder
                    .getRequestAttributes())
                    .getRequest();
            return req;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ValidationException("A requisicao atual nao foi processada");
        }
    }
}

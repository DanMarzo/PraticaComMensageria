package com.br.danmarzo.produto.config.interceptor;

import com.br.danmarzo.produto.config.exception.ValidationException;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class FeingClientInterceptor  implements RequestInterceptor {
    private static final String Authorization = "Authorization";
    @Override
    public void apply(RequestTemplate template) {
        var httpRequest = this.getCurrentRequest();
        template.header(Authorization, httpRequest.getHeader(Authorization));
    }

    private HttpServletRequest getCurrentRequest(){
        try {
            return ((ServletRequestAttributes)RequestContextHolder
                    .getRequestAttributes())
                    .getRequest();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ValidationException("A requisicao atual nao foi processada");
        }
    }
}

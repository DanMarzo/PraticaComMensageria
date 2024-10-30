package com.br.danmarzo.produto.config.interceptor;

import com.br.danmarzo.produto.config.exception.ValidationException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class RequestUtil {

    public static HttpServletRequest getCurrentRequest() {
        try {
            var req = ((ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes())
                    .getRequest();
            return req;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ValidationException("A requisicao atual nao foi processada");
        }
    }
}

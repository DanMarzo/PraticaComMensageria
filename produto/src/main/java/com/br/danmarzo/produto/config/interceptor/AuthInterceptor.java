package com.br.danmarzo.produto.config.interceptor;

import com.br.danmarzo.produto.config.exception.ValidationException;
import com.br.danmarzo.produto.modules.jwt.service.JwtService;
import io.jsonwebtoken.lang.Objects;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.UUID;


public class AuthInterceptor implements HandlerInterceptor {

    private static final String AUTHORIZATION = "Authorization";
    private static final String TRANSACTION_ID = "transactionid";
    private static final String SERVICE_ID = "serviceid";

    @Autowired
    private JwtService jwtService;

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {
        if(request.getRequestURI().contains("swagger") || request.getRequestURI().contains("api-docs")){
            return true;
        }
        if(this.isOptions(request)){
            return true;
        }

        if(Objects.isEmpty(request.getHeader(TRANSACTION_ID))){
            throw new ValidationException("The transaction id header is required");
        }
        var authorization = request.getHeader(AUTHORIZATION);
        this.jwtService.validateAuthorization(authorization);
        request.setAttribute(SERVICE_ID, UUID.randomUUID().toString());
        return true;
    }

    private boolean isOptions(HttpServletRequest request){
        return HttpMethod.OPTIONS.name().equals(request.getMethod());
    }
}

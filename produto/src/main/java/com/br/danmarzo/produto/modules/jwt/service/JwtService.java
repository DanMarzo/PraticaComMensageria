package com.br.danmarzo.produto.modules.jwt.service;

import com.br.danmarzo.produto.config.exception.AuthenticationException;
import com.br.danmarzo.produto.config.exception.ValidationException;
import com.br.danmarzo.produto.modules.jwt.dto.JwtResponseDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class JwtService {

    private static final String BEARER = "Bearer ";

    @Value("${app-config.secrets.api-secret}")
    private String apiSecret;

    public void validateAuthorization(String token){
        var accessToken = this.extractToken(token);
        try{
            var claims= Jwts
                    .parser()
                    .verifyWith(Keys.hmacShaKeyFor(this.apiSecret.getBytes()))
                    .build()
                    .parseSignedClaims(accessToken)
                    .getPayload();
            var user = JwtResponseDTO.getUser(claims);
            if(isEmpty(user)){
                throw new AuthenticationException("The user is not valid");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new AuthenticationException("Erro while trying to process the Access token.");
        }
    }

    private String extractToken(String token) {
        if (isEmpty(token)) {
            throw new AuthenticationException("The access token was not informed");
        }
        if (token.contains(BEARER)) {
            return token.split(" ")[1];
        }
        return token;
    }
}

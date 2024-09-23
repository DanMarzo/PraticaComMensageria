package com.br.danmarzo.produto.modules.jwt.dto;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDTO {
    private Integer id;
    private String email;
    private String name;

    public static JwtResponseDTO getUser(Claims jwtClaims){
        try {
            return JwtResponseDTO
                    .builder()
                    .id((Integer) jwtClaims.get("id"))
                    .email((String) jwtClaims.get("email"))
                    .name((String) jwtClaims.get("name"))
                    .build();
        }
        catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }
}

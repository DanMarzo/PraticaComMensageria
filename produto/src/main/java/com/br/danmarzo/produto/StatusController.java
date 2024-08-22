package com.br.danmarzo.produto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController("/")
public class StatusController {
    @GetMapping("status")
    public ResponseEntity<HashMap<String, Object>> getApiStatus(){
        var response = new HashMap<String, Object>();
        response.put("service", "ProdutoAPI");
        response.put("httpstatus", HttpStatus.OK.value());
        return ResponseEntity.ok(response);
    }
}

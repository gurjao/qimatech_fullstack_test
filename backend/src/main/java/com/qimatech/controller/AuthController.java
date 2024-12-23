package com.qimatech.controller;

import com.qimatech.config.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login") // Endpoint para gerar o token
    public ResponseEntity<String> login(@RequestParam String username) { // Recebe o nome de usuário
        String token = jwtTokenProvider.generateToken(username); // Gera o token JWT
        return ResponseEntity.ok(token); // Retorna o token na resposta
    }
}
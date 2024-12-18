package com.qimatech.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Desativa CSRF (se necessário)
            .authorizeHttpRequests(auth -> auth.requestMatchers("/h2-console/**").permitAll() // Permite o acesso ao H2 Console
                    .requestMatchers("/api/**").authenticated()    // Restringe acesso às APIs
            ).headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable())) // Habilita o console H2
            .formLogin(form -> form.permitAll()); // Login padrão habilitado

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
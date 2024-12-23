package com.qimatech.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Collections;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final String SECRET_KEY_STRING = "404E635266556A586E2F4A72357538782F413F4428472B4B6250655368566D59";
    private final Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY_STRING));

    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 3600000);
        return Jwts.builder().setSubject(username).setIssuedAt(now).setExpiration(expiryDate).signWith(key).compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) { System.out.println("Assinatura JWT Inválida.");
        } catch (ExpiredJwtException ex) { System.out.println("JWT Expirado.");
        } catch (MalformedJwtException ex) {System.out.println("JWT com formato inválido.");
        } catch (UnsupportedJwtException ex) {System.out.println("JWT não suportado.");
        } catch (IllegalArgumentException ex) {System.out.println("Argumento JWT inválido.");
        } catch (Exception e) {System.out.println("Erro na validação: " + e.getMessage());}
        return false;
    }

    public UsernamePasswordAuthenticationToken getAuthentication(String token) {
        try{
            Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(token).getBody();
            String username = claims.getSubject();
            return new UsernamePasswordAuthenticationToken(username, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        }catch (Exception e){
            System.out.println("Erro ao obter autenticação: "+ e.getMessage());
            return null;
        }
    }
}
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly fixedToken = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0ZSIsImlhdCI6MTczNTMwMjk4MSwiZXhwIjoxNzM1MzA2NTgxfQ.17A0A1HdFhN8QbCDXWlrA8jefawoQhR2u-2kqTknrnqp8VJllODbXGuiD9V0iDOl';

  getAuthorizationHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.fixedToken}`
    });
    return headers;
  }

  isLoggedIn(): boolean {
      return !!this.fixedToken;
  }
}

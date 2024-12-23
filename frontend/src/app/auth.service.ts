import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0ZSIsImlhdCI6MTczNDkwODQ4NCwiZXhwIjoxNzM0OTEyMDg0fQ.aEujph9qXjZ-kkrnLiIGbXTwH__cB1p_yxmJYFYNygN8nAyDBcAIx20IW8eaMALg';
  private storage: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.storage = isPlatformBrowser(this.platformId) ? localStorage : sessionStorage;
    if (this.token) {
      this.storage.setItem('token', this.token);
    }
  }

  getToken(): string | null {
    return this.storage.getItem('token');
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }
}

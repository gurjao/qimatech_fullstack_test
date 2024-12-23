import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders // Importe HttpHeaders aqui
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authHeaders = this.authService.getHeaders();

    if (authHeaders.keys().length > 0) {
      let modifiedHeaders = request.headers;
      authHeaders.keys().forEach(key => {
        const values = authHeaders.getAll(key);
        if (values) {
            modifiedHeaders = modifiedHeaders.set(key, values);
        }
      });

      const authReq = request.clone({
          headers: modifiedHeaders
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}

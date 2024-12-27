import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authHeader = this.authService.getAuthorizationHeader();
    const authReq = req.clone({
      setHeaders: {
        Authorization: authHeader.get('Authorization')!
      }
    })
    return next.handle(authReq);
    }
}

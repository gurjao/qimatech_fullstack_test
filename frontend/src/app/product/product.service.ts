import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro no cliente:', error.error.message);
    } else {
      console.error(
        `Erro no backend - Código ${error.status}, Corpo: ${error.error}`
      );
    }
    return throwError(() => new Error('Algo de errado aconteceu; tente novamente mais tarde.'));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(response => console.log('Resposta do Backend:', response)),
      map(response => Array.isArray(response) ? response : []), // Garantir que o retorno seja um array
      catchError(this.handleError)
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(response => console.log('Produto adicionado:', response)),
      catchError(this.handleError)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product).pipe(
      tap(response => console.log('Produto atualizado:', response)),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Produto com ID ${id} deletado`)),
      catchError(this.handleError)
    );
  }
}

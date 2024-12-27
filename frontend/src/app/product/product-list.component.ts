import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ProductFormComponent } from './product-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    TextareaModule,
    DialogModule,
    TagModule,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  displayDialog: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
          this.products = products;
          console.log("Resposta do backend (no componente):", products);
      },
      error: (error) => {
          console.error('Erro ao carregar produtos:', error);
      }
  });
  }

  handleProductChange(product: Product | null): void {
    this.displayDialog = false;
    if (product) {
      if (product.id) {
        this.productService.updateProduct(product).subscribe(updatedProduct => {
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
        });
      } else {
        this.productService.addProduct(product).subscribe(newProduct => {
          this.products.push(newProduct);
        });
      }
    }
    this.selectedProduct = null;
  }

  editProduct(product: Product): void {
    this.selectedProduct = { ...product }; // Cria uma cópia!
    this.displayDialog = true;
  }

    showDialog(): void {
    this.selectedProduct = null;
    this.displayDialog = true;
  }


  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(p => p.id !== productId);
    });
  }
}

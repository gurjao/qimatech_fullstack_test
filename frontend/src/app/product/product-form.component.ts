import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { Product } from './models/product';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    TextareaModule,
    DialogModule,
    TagModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product.component.css'
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() productChange = new EventEmitter<Product | null>();

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [this.product?.name || '', Validators.required],
      description: [this.product?.description || ''],
      price: [this.product?.price || 0, [Validators.required, Validators.min(0)]],
      available: [this.product?.available ?? false]
    });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = { ...this.product, ...this.productForm.value };
      this.productChange.emit(updatedProduct);
    }
  }

  close(): void {
    this.productChange.emit(null);
  }
}

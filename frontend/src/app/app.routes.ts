import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list.component';
import { ProductFormComponent } from './product/product-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: '**', redirectTo: 'products' }
];

import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';



@NgModule({
  declarations: [
    ProductsDetailsComponent,
    AllProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    SharedModule,
    RouterModule
  ]
})
export class ProductsModule { }

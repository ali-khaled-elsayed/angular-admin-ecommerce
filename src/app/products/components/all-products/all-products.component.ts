import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products:any = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[]= [];
  base64:any;
  form!: FormGroup;

  constructor(private service: ProductsService, private build: FormBuilder){}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.form =this.build.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]]
  })
  }

  getProducts(){
    this.loading= true;
    this.service.getAllProducts().subscribe((res:any) => {
      this.products = res;
      this.loading=false;
    } , error => {
      alert('error');
    });
  }

  getCategories(){
    this.loading= true;
    this.service.getAllCategories().subscribe((res:any) => {
      this.categories = res;
      this.loading= false;
    } , error => {
      alert('error');
    });
  }

  filterCategory(event:any){
    let value = event.target.value;
    if(value === 'All'){
      this.getProducts();
    }else{
      this.getProductsByCategory(value);
    }
  }

  getProductsByCategory(filter: string){
    this.loading= true;
    this.service.getProductsByCategory(filter).subscribe(res => {
      this.products = res;
      this.loading= false;
    } , error => {
      alert('error');
    });
  }

  addToCart(event: any){
    console.log(event);
    if ("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id);
      if (exist) {
        alert("product aleardy in your cart");
      }else{
        this.cartProducts.push(event);
      localStorage.setItem("cart" ,JSON.stringify(this.cartProducts));
      }
    }else{
      this.cartProducts.push(event);
      localStorage.setItem("cart" ,JSON.stringify(this.cartProducts));
    }
   
  }

  getImagePath(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue(this.base64);
    };
  }

  addProduct(){
    const model = this.form.value;
    this.service.addProduct(model).subscribe(res => {
      alert("Product Added Success");
    })
  }

  getSelectedCategory(event:any){
    this.form.get('category')?.setValue(event.target.value);
  }

  update(item:any){
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category
    })
    this.base64= item.image;
  }
}

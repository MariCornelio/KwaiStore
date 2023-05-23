import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  Product,
  ProductModel,
} from 'src/app/pages/products/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  products: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get totalActions$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantyActions$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartActions$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }
  // el parameto product viene del servidor
  updateCart(product: ProductModel): void {
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
  }

  resetCart(): void {
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.products = [];
  }

  // el product viene del servidor
  private addToCart(productModel: ProductModel): void {
    // este products es que array vacio que has creado aqui
    const isProductInCart = this.products.find(
      ({ id, model }) =>
        id === productModel.product.id && model === productModel.model
    );

    if (isProductInCart) {
      isProductInCart.qty += 1;
    } else {
      this.products.push({
        ...productModel.product,
        qty: 1,
        model: productModel.model,
      });
    }
    this.cartSubject.next(this.products);
  }
  private quantityProducts(): void {
    const quantity = this.products.reduce((acc, prod) => (acc += prod.qty), 0);
    this.quantitySubject.next(quantity);
  }
  private calcTotal(): void {
    const total = this.products.reduce(
      (acc, prod) => (acc += prod.price * prod.qty),
      0
    );
    this.totalSubject.next(total);
  }

  deleteProduct(id: number, model: number): void {
    const product = this.products.find(
      (el) => el.id === id && el.model === model
    );
    if (product) {
      this.products = this.products.filter(
        (obj) => !(obj.id === product.id && obj.model === product.model)
      );
      this.cartSubject.next(this.products);
      this.calcTotal();
      this.quantityProducts();
    }
  }

  qtyOperations(id: number, operations: string, model: number) {
    const product = this.products.find(
      (el) => el.id === id && el.model === model
    );
    if (product) {
      if (operations === 'minus' && product.qty > 0) {
        product.qty = product.qty - 1;
        this.calcTotal();
        this.quantityProducts();
      }
      if (operations === 'add') {
        product.qty = product.qty + 1;
        this.calcTotal();
        this.quantityProducts();
      }
      if (product.qty === 0) {
        this.deleteProduct(id, model);
        this.quantityProducts();
      }
    }
  }
}

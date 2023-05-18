import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';

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
  updateCart(product: Product): void {
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
  private addToCart(product: Product): void {
    // este products es que array vacio que has creado aqui
    const isProductInCart = this.products.find(({ id }) => id === product.id);

    if (isProductInCart) {
      isProductInCart.qty += 1;
    } else {
      this.products.push({ ...product, qty: 1 });
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
}

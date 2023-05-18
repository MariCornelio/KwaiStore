import { Component } from '@angular/core';
import { DataService } from '../products/services/data.service';
import { switchMap, tap, delay } from 'rxjs/operators';
import { Store } from '../../shared/interfaces/store.interface';
import { NgForm } from '@angular/forms';
import {
  Details,
  DetailsOrder,
  Order,
} from 'src/app/shared/interfaces/order.interface';
import { Product } from '../products/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: '',
  };
  isDelivery: Boolean = true;
  stores: Store[] = [];
  cart: Product[] = [];
  details: Details[] = [];
  constructor(
    private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productsSvc: ProductsService
  ) {
    this.checkIfCartIsEmpty();
  }

  ngOnInit(): void {
    this.getStore();
    // es para cuando inicialices la aplicacion la variable cart, tenga algo
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value: boolean): void {
    // console.log(value);
    this.isDelivery = value;
  }

  private getStore(): void {
    this.dataSvc
      .getStores()
      .pipe(tap((res: Store[]) => (this.stores = res)))
      .subscribe();
  }
  // destructuración de objetos con nueva propiedad
  // renombrando propiedad value
  onSubmit({ value: formData }: NgForm): void {
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery,
    };
    console.log(data);
    this.dataSvc
      .saveOrder(data)
      .pipe(
        tap((res) => console.log('Order->', res)),
        switchMap(({ id: orderId }) => {
          // console.log(order);
          this.prepareDetails();
          return this.dataSvc.saveDetailsOrder({
            details: this.details,
            orderId,
          });
        }),
        tap((resp) => this.router.navigate(['/checkout/thank-you-page'])),
        delay(2000),
        tap(() => this.shoppingCartSvc.resetCart())
      )
      .subscribe();
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): void {
    console.log(this.cart);

    this.cart.forEach((product: Product) => {
      const {
        id: productId,
        name: productName,
        qty: quantity,
        stock,
      } = product;
      const updateStock = stock - quantity;
      console.log(productName);
      this.productsSvc
        .updateStock(productId, updateStock)
        .pipe(
          tap(() => this.details.push({ productId, productName, quantity }))
        )
        .subscribe();
    });
  }

  // asocia el subject y como devuelve un observable lo ejecuta y lo almecena el variable cart del componente
  private getDataCart(): void {
    this.shoppingCartSvc.cartActions$
      .pipe(tap((products: Product[]) => (this.cart = products)))
      .subscribe();
  }

  // redirecciona si el carrito está vacío
  private checkIfCartIsEmpty(): void {
    this.shoppingCartSvc.cartActions$
      .pipe(
        tap((products: Product[]) => {
          if (Array.isArray(products) && !products.length) {
            this.router.navigate(['/products']);
          }
        })
      )
      .subscribe();
  }
}

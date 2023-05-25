import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../../products/interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(
    private shoppinCartSvc: ShoppingCartService,
    private router: Router
  ) {
    this.checkIfCartIsEmpty();
  }
  total$ = this.shoppinCartSvc.totalActions$;
  cart$ = this.shoppinCartSvc.cartActions$;

  updateProduct(id: number, value: string, model: number) {
    this.shoppinCartSvc.qtyOperations(id, value, model);
  }
  deleteProduct(id: number, model: number) {
    this.shoppinCartSvc.deleteProduct(id, model);
  }
  // redirecciona si el carrito está vacío
  private checkIfCartIsEmpty(): void {
    this.cart$
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

import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(private shoppinCartSvc: ShoppingCartService) {}
  total$ = this.shoppinCartSvc.totalActions$;
  cart$ = this.shoppinCartSvc.cartActions$;
}
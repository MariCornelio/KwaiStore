import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { BuyOrderService } from 'src/app/shared/services/buy-order.service';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.css'],
})
export class ThankYouPageComponent implements OnInit {
  order!: Order;
  orderDelivery!: Boolean;
  order$ = this.orderSvc.orderActions$;
  constructor(private orderSvc: BuyOrderService, private router: Router) {}
  ngOnInit(): void {
    this.order$.subscribe((res) => {
      this.order = res;
      if (!res.isDelivery) {
        this.orderDelivery = false;
      } else {
        this.orderDelivery = true;
      }
    });
  }
  back() {
    this.orderSvc.resetOrder();
    this.router.navigate(['']);
  }
}

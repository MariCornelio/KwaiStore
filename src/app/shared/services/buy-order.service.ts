import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class BuyOrderService {
  private orderSubject = new BehaviorSubject<Order>({
    id: 0,
    name: '',
    date: '',
    isDelivery: false,
    shippingAddress: '',
    city: '',
  });
  get orderActions$(): Observable<Order> {
    return this.orderSubject.asObservable();
  }
  constructor() {}

  addToOrder(order: Order) {
    this.orderSubject.next(order);
  }
  resetOrder(): void {
    this.orderSubject.next({
      id: 0,
      name: '',
      date: '',
      isDelivery: false,
      shippingAddress: '',
      city: '',
    });
  }
}

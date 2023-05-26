import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../../../shared/interfaces/store.interface';
import { DetailsOrder, Order } from 'src/app/shared/interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiURL = 'https://kwai-store-mock-server.onrender.com';
  constructor(private http: HttpClient) {}
  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiURL}/stores`);
  }
  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiURL}/orders`, order);
  }
  saveDetailsOrder(details: DetailsOrder): Observable<DetailsOrder> {
    return this.http.post<DetailsOrder>(
      `${this.apiURL}/detailsOrders`,
      details
    );
  }
}

import { Store } from "./store.interface";

export interface Details {
  productId: number;
  productName: string;
  quantity: number;
  model: number;
}

export interface Order {
  id: number;
  name: string;
  date: string;
  store?:Store
  shippingAddress?: string;
  city?: string;
  isDelivery: boolean;
}

export interface DetailsOrder {
  details: Details[];
  orderId: number;
  id?: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  img: string[];
  categoryId: number;
  stock: number;
  qty: number;
  model: number;
}

export interface ProductModel {
  product: Product;
  model: number;
}

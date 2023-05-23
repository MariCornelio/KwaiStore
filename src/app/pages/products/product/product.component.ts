import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ElementRef,
} from '@angular/core';
import { Product, ProductModel } from '../interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  model: number = 2;
  @Input() product!: Product;
  @Output() addToCartClick = new EventEmitter<ProductModel>();
  constructor(
    private elementRef: ElementRef,
  ) {}
  onClick(): void {
    // console.log('click', this.product);
    this.addToCartClick.emit({
      product: this.product,
      model:this.model
    });

  }
  changeImage(img: string, index: number) {
    const containerImages =
      this.elementRef.nativeElement.querySelector('.card-image img');

    containerImages.setAttribute('src', img);
    this.model = index + 1;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ElementRef,
} from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCartClick = new EventEmitter<Product>();
  constructor(private elementRef: ElementRef) {}
  onClick(): void {
    // console.log('click', this.product);
    this.addToCartClick.emit(this.product);
  }
  changeImage(img: string) {
    const containerImages =
      this.elementRef.nativeElement.querySelector('.card-image img');

    containerImages.setAttribute('src', img);
  }
}

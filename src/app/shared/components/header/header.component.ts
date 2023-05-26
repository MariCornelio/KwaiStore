import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // template: `
  //   <mat-toolbar color="primary" class="header">
  //     <a [routerLink]="['/']"
  //       ><img src="../../../../assets/bearlogo.svg" class="logo" /><span
  //         >Kwai Store</span
  //       ></a
  //     >
  //     <div class="header-nav">
  //       <a [routerLink]="['/products']"><span>Products</span></a>
  //       <a [routerLink]="['/products']"><span>About</span></a>

  //       <!-- renderizando el app-cart en una parte del header -->
  //       <app-cart (click)="goToCheckout()"></app-cart>
  //     </div>
  //   </mat-toolbar>
  // `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  squares!: null[];
  activeProducts: boolean = false;
  activeAbout: boolean = false;
  activeHome: boolean = false;
  activeCart: boolean = false;
  constructor(private router: Router) {}
  // goToCheckout(): void {
  //   this.router.navigate(['/checkout']);
  // }

  ngOnInit(): void {
    this.squareGenerate();
  }
  onResize() {
    this.squareGenerate();
  }
  squareGenerate() {
    // const headerRoofWidth = this.headerRoof.nativeElement.offsetWidth;
    // console.log(headerRoofWidth);
    const headerRoofWidth = window.innerWidth;
    const widthSquare = 40;
    const numSquares = Math.round(headerRoofWidth / widthSquare - 1);
    this.squares = Array(numSquares).fill(null);
  }
  changeNav(value: string) {
    if (value === 'products') {
      this.router.navigate(['products']);
      this.activeProducts = true;
      this.activeAbout = false;
      this.activeHome = false;
      this.activeCart = false;
    }
    if (value === 'about') {
      this.router.navigate(['about']);
      this.activeProducts = false;
      this.activeAbout = true;
      this.activeHome = false;
      this.activeCart = false;
    }
    if (value === 'home') {
      this.activeProducts = false;
      this.activeAbout = false;
      this.activeHome = true;
      this.activeCart = false;
    }
    if (value === 'cart') {
      this.router.navigate(['/checkout']);
      this.activeProducts = false;
      this.activeAbout = false;
      this.activeHome = false;
      this.activeCart = true;
    }
  }
}

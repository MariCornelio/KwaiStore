import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [CheckoutComponent, DetailsComponent],
  imports: [CommonModule, CheckoutRoutingModule, MaterialModule, FormsModule],
})
export class CheckoutModule {}

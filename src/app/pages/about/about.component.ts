import { Component, OnInit } from '@angular/core';
import { DataService } from '../products/services/data.service';
import { Store } from 'src/app/shared/interfaces/store.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  stores!: Store[];
  constructor(private dataSvc: DataService) { }
  ngOnInit(): void {
    this.dataSvc.getStores().subscribe(res => {
      this.stores = res;
    })
  }
}

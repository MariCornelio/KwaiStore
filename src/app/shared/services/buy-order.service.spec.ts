import { TestBed } from '@angular/core/testing';

import { BuyOrderService } from './buy-order.service';

describe('BuyOrderService', () => {
  let service: BuyOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

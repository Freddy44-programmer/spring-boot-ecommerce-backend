import { TestBed } from '@angular/core/testing';

import { CheckoutShopFormService } from './shop-form.service';

describe('CheckoutShopFormService', () => {
  let service: CheckoutShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

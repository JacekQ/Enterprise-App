import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { CustomersService } from './customers.service';
import { httpClientMock } from '../../../../tests';

describe('CustomersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomersService,
        FormBuilder,
        {
          provide: HttpClient,
          useValue: httpClientMock
        }
      ]
    });
  });

  it('should be created', inject([CustomersService], (service: CustomersService) => {
    expect(service).toBeTruthy();
  }));
});

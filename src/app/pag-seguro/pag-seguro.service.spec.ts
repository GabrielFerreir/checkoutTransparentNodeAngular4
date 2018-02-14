import { TestBed, inject } from '@angular/core/testing';

import { PagSeguroService } from './pag-seguro.service';

describe('PagSeguroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagSeguroService]
    });
  });

  it('should be created', inject([PagSeguroService], (service: PagSeguroService) => {
    expect(service).toBeTruthy();
  }));
});

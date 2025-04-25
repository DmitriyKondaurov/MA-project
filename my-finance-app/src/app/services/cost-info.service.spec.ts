import { TestBed } from '@angular/core/testing';

import { CostInfoService } from './cost-info.service';

describe('CostInfoService', () => {
  let service: CostInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

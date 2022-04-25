import { TestBed } from '@angular/core/testing';

import { GetObjValuesService } from './get-obj-values.service';

describe('GetObjValuesService', () => {
  let service: GetObjValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetObjValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

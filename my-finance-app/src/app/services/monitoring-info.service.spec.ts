import { TestBed } from '@angular/core/testing';

import { MonitoringInfoService } from './monitoring-info.service';

describe('MonitoringInfoService', () => {
  let service: MonitoringInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoringInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

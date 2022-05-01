import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostMonitoringComponent } from './cost-monitoring.component';

describe('CostMonitoringComponent', () => {
  let component: CostMonitoringComponent;
  let fixture: ComponentFixture<CostMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

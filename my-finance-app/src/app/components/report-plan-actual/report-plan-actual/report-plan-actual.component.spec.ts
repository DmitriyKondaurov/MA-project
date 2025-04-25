import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPlanActualComponent } from './report-plan-actual.component';

describe('ReportPlanActualComponent', () => {
  let component: ReportPlanActualComponent;
  let fixture: ComponentFixture<ReportPlanActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPlanActualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPlanActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

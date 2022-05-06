import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticFieldComponent } from './statistic-field.component';

describe('StatisticFieldComponent', () => {
  let component: StatisticFieldComponent;
  let fixture: ComponentFixture<StatisticFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

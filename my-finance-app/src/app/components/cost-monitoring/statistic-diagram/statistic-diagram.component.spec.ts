import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDiagramComponent } from './statistic-diagram.component';

describe('StatisticDiagramComponent', () => {
  let component: StatisticDiagramComponent;
  let fixture: ComponentFixture<StatisticDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

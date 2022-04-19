import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCostComponent } from './field-cost.component';

describe('FieldCostComponent', () => {
  let component: FieldCostComponent;
  let fixture: ComponentFixture<FieldCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

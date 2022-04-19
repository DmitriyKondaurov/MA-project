import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCostItemComponent } from './field-cost-item.component';

describe('FieldCostItemComponent', () => {
  let component: FieldCostItemComponent;
  let fixture: ComponentFixture<FieldCostItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldCostItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

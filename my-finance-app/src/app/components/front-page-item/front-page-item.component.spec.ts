import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageItemComponent } from './front-page-item.component';

describe('FrontPageItemComponent', () => {
  let component: FrontPageItemComponent;
  let fixture: ComponentFixture<FrontPageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

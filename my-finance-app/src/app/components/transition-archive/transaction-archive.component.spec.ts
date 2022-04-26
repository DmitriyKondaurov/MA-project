import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionArchiveComponent } from './transaction-archive.component';

describe('TransactionArchiveComponent', () => {
  let component: TransactionArchiveComponent;
  let fixture: ComponentFixture<TransactionArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

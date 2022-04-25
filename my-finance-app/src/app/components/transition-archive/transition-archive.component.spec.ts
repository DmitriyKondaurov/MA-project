import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionArchiveComponent } from './transition-archive.component';

describe('TransitionArchiveComponent', () => {
  let component: TransitionArchiveComponent;
  let fixture: ComponentFixture<TransitionArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitionArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

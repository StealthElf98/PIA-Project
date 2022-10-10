import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tournament2Component } from './tournament2.component';

describe('Tournament2Component', () => {
  let component: Tournament2Component;
  let fixture: ComponentFixture<Tournament2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tournament2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tournament2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tournament3Component } from './tournament3.component';

describe('Tournament3Component', () => {
  let component: Tournament3Component;
  let fixture: ComponentFixture<Tournament3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tournament3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tournament3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

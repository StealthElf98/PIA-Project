import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tournament1Component } from './tournament1.component';

describe('Tournament1Component', () => {
  let component: Tournament1Component;
  let fixture: ComponentFixture<Tournament1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tournament1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tournament1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

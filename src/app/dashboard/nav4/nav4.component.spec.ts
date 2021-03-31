import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nav4Component } from './nav4.component';

describe('Nav4Component', () => {
  let component: Nav4Component;
  let fixture: ComponentFixture<Nav4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Nav4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Nav4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

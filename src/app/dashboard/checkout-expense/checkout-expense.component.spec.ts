import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutExpenseComponent } from './checkout-expense.component';

describe('CheckoutExpenseComponent', () => {
  let component: CheckoutExpenseComponent;
  let fixture: ComponentFixture<CheckoutExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

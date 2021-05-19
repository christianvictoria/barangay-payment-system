import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingExpenseComponent } from './pending-expense.component';

describe('PendingExpenseComponent', () => {
  let component: PendingExpenseComponent;
  let fixture: ComponentFixture<PendingExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

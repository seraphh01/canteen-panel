import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMealMenuDialogComponent } from './add-meal-menu-dialog.component';

describe('AddMealMenuDialogComponent', () => {
  let component: AddMealMenuDialogComponent;
  let fixture: ComponentFixture<AddMealMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMealMenuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMealMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

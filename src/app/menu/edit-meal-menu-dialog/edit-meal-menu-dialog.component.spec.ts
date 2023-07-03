import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMealMenuDialogComponent } from './edit-meal-menu-dialog.component';

describe('EditMealMenuDialogComponent', () => {
  let component: EditMealMenuDialogComponent;
  let fixture: ComponentFixture<EditMealMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMealMenuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMealMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

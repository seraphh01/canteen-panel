import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodMenuDialogComponent } from './edit-food-menu-dialog.component';

describe('EditFoodMenuDialogComponent', () => {
  let component: EditFoodMenuDialogComponent;
  let fixture: ComponentFixture<EditFoodMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFoodMenuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFoodMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

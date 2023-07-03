import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodMenuDialogComponent } from './add-food-menu-dialog.component';

describe('AddFoodMenuDialogComponent', () => {
  let component: AddFoodMenuDialogComponent;
  let fixture: ComponentFixture<AddFoodMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoodMenuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

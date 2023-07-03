import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsViewComponent } from './meals-view.component';

describe('MealsViewComponent', () => {
  let component: MealsViewComponent;
  let fixture: ComponentFixture<MealsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

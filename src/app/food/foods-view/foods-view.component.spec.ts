import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsViewComponent } from './foods-view.component';

describe('FoodsViewComponent', () => {
  let component: FoodsViewComponent;
  let fixture: ComponentFixture<FoodsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

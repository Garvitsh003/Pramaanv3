import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidDidComponent } from './invalid-did.component';

describe('InvalidDidComponent', () => {
  let component: InvalidDidComponent;
  let fixture: ComponentFixture<InvalidDidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidDidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidDidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

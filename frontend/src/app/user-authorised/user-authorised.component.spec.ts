import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthorisedComponent } from './user-authorised.component';

describe('UserAuthorisedComponent', () => {
  let component: UserAuthorisedComponent;
  let fixture: ComponentFixture<UserAuthorisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuthorisedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuthorisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PramaanpageComponent } from './pramaanpage.component';
describe('PramaanpageComponent', () => {
    let component: PramaanpageComponent;
    let fixture: ComponentFixture<PramaanpageComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ PramaanpageComponent ]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(PramaanpageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  
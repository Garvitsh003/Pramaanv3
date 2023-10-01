import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { QrpageComponent } from './qrpage.component';

describe('QrpageComponent', () => {
  let component: QrpageComponent;
  let fixture: ComponentFixture<QrpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrpageComponent],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MudarSafraComponent } from './mudar-safra.component';

describe('MudarSafraComponent', () => {
  let component: MudarSafraComponent;
  let fixture: ComponentFixture<MudarSafraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MudarSafraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MudarSafraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

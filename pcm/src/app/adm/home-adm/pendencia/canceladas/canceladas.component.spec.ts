import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceladasComponent } from './canceladas.component';

describe('CanceladasComponent', () => {
  let component: CanceladasComponent;
  let fixture: ComponentFixture<CanceladasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceladasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPendenciaComponent } from './nova-pendencia.component';

describe('NovaPendenciaComponent', () => {
  let component: NovaPendenciaComponent;
  let fixture: ComponentFixture<NovaPendenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaPendenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaPendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

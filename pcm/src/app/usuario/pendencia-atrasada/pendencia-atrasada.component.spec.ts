import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendenciaAtrasadaComponent } from './pendencia-atrasada.component';

describe('PendenciaAtrasadaComponent', () => {
  let component: PendenciaAtrasadaComponent;
  let fixture: ComponentFixture<PendenciaAtrasadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendenciaAtrasadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendenciaAtrasadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

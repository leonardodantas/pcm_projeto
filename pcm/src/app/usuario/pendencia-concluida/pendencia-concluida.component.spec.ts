import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendenciaConcluidaComponent } from './pendencia-concluida.component';

describe('PendenciaConcluidaComponent', () => {
  let component: PendenciaConcluidaComponent;
  let fixture: ComponentFixture<PendenciaConcluidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendenciaConcluidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendenciaConcluidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

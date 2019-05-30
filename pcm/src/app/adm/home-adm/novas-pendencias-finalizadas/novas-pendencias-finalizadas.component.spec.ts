import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovasPendenciasFinalizadasComponent } from './novas-pendencias-finalizadas.component';

describe('NovasPendenciasFinalizadasComponent', () => {
  let component: NovasPendenciasFinalizadasComponent;
  let fixture: ComponentFixture<NovasPendenciasFinalizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovasPendenciasFinalizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovasPendenciasFinalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

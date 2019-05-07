import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicoesEsperaComponent } from './requisicoes-espera.component';

describe('RequisicoesEsperaComponent', () => {
  let component: RequisicoesEsperaComponent;
  let fixture: ComponentFixture<RequisicoesEsperaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisicoesEsperaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicoesEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

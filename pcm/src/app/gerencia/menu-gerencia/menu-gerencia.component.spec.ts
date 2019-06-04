import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGerenciaComponent } from './menu-gerencia.component';

describe('MenuGerenciaComponent', () => {
  let component: MenuGerenciaComponent;
  let fixture: ComponentFixture<MenuGerenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuGerenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

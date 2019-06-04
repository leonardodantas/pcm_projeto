import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaHomeComponent } from './gerencia-home.component';

describe('GerenciaHomeComponent', () => {
  let component: GerenciaHomeComponent;
  let fixture: ComponentFixture<GerenciaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndamentoComponent } from './andamento.component';

describe('AndamentoComponent', () => {
  let component: AndamentoComponent;
  let fixture: ComponentFixture<AndamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

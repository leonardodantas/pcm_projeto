import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovasRequisicoesComponent } from './novas-requisicoes.component';

describe('NovasRequisicoesComponent', () => {
  let component: NovasRequisicoesComponent;
  let fixture: ComponentFixture<NovasRequisicoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovasRequisicoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovasRequisicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

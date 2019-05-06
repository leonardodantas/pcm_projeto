import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaRequisicaoComponent } from './nova-requisicao.component';

describe('NovaRequisicaoComponent', () => {
  let component: NovaRequisicaoComponent;
  let fixture: ComponentFixture<NovaRequisicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaRequisicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaRequisicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

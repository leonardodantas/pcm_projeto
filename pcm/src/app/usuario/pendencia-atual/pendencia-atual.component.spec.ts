import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendenciaAtualComponent } from './pendencia-atual.component';

describe('PendenciaAtualComponent', () => {
  let component: PendenciaAtualComponent;
  let fixture: ComponentFixture<PendenciaAtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendenciaAtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendenciaAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

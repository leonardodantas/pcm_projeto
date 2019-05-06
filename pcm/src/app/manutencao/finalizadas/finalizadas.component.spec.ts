import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizadasComponent } from './finalizadas.component';

describe('FinalizadasComponent', () => {
  let component: FinalizadasComponent;
  let fixture: ComponentFixture<FinalizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

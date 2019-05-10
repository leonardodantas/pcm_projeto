import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeitadasComponent } from './rejeitadas.component';

describe('RejeitadasComponent', () => {
  let component: RejeitadasComponent;
  let fixture: ComponentFixture<RejeitadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejeitadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejeitadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

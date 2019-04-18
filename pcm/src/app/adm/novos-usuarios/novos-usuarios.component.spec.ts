import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovosUsuariosComponent } from './novos-usuarios.component';

describe('NovosUsuariosComponent', () => {
  let component: NovosUsuariosComponent;
  let fixture: ComponentFixture<NovosUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovosUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTodasComponent } from './listar-todas.component';

describe('ListarTodasComponent', () => {
  let component: ListarTodasComponent;
  let fixture: ComponentFixture<ListarTodasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTodasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTodasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

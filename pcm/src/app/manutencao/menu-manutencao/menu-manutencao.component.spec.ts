import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManutencaoComponent } from './menu-manutencao.component';

describe('MenuManutencaoComponent', () => {
  let component: MenuManutencaoComponent;
  let fixture: ComponentFixture<MenuManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

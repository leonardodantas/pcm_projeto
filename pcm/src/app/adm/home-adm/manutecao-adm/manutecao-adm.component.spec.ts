import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutecaoAdmComponent } from './manutecao-adm.component';

describe('ManutecaoAdmComponent', () => {
  let component: ManutecaoAdmComponent;
  let fixture: ComponentFixture<ManutecaoAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManutecaoAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutecaoAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

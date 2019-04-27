import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeManutencaoComponent } from './home-manutencao.component';

describe('HomeManutencaoComponent', () => {
  let component: HomeManutencaoComponent;
  let fixture: ComponentFixture<HomeManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

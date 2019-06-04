import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndamentoPComponent } from './andamento-p.component';

describe('AndamentoPComponent', () => {
  let component: AndamentoPComponent;
  let fixture: ComponentFixture<AndamentoPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndamentoPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndamentoPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberadasComponent } from './liberadas.component';

describe('LiberadasComponent', () => {
  let component: LiberadasComponent;
  let fixture: ComponentFixture<LiberadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiberadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiberadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovasComponent } from './novas.component';

describe('NovasComponent', () => {
  let component: NovasComponent;
  let fixture: ComponentFixture<NovasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

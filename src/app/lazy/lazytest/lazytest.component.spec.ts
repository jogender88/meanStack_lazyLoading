import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazytestComponent } from './lazytest.component';

describe('LazytestComponent', () => {
  let component: LazytestComponent;
  let fixture: ComponentFixture<LazytestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazytestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazytestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

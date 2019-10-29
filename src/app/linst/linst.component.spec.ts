import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinstComponent } from './linst.component';

describe('LinstComponent', () => {
  let component: LinstComponent;
  let fixture: ComponentFixture<LinstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

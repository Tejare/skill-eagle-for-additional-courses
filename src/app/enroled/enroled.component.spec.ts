import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnroledComponent } from './enroled.component';

describe('EnroledComponent', () => {
  let component: EnroledComponent;
  let fixture: ComponentFixture<EnroledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnroledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnroledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

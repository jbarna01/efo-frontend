import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunkaorakComponent } from './munkaorak.component';

describe('MunkaorakComponent', () => {
  let component: MunkaorakComponent;
  let fixture: ComponentFixture<MunkaorakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunkaorakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunkaorakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrakRogziteseComponent } from './orak-rogzitese.component';

describe('OrakRogziteseComponent', () => {
  let component: OrakRogziteseComponent;
  let fixture: ComponentFixture<OrakRogziteseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrakRogziteseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrakRogziteseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunkaorakNavAdatokComponent } from './munkaorak-nav-adatok.component';

describe('MunkaorakNavAdatokComponent', () => {
  let component: MunkaorakNavAdatokComponent;
  let fixture: ComponentFixture<MunkaorakNavAdatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunkaorakNavAdatokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunkaorakNavAdatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

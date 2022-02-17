import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzervezetekComponent } from './szervezetek.component';

describe('SzervezetekComponent', () => {
  let component: SzervezetekComponent;
  let fixture: ComponentFixture<SzervezetekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SzervezetekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SzervezetekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

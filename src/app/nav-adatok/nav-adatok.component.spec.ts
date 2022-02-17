import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdatokComponent } from './nav-adatok.component';

describe('NavAdatokComponent', () => {
  let component: NavAdatokComponent;
  let fixture: ComponentFixture<NavAdatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAdatokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAdatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

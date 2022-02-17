import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdatokBetolteseComponent } from './nav-adatok-betoltese.component';

describe('NavAdatokBetolteseComponent', () => {
  let component: NavAdatokBetolteseComponent;
  let fixture: ComponentFixture<NavAdatokBetolteseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAdatokBetolteseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAdatokBetolteseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

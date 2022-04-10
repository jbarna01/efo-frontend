import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RogzitettAdatokModositasaComponent } from './rogzitett-adatok-modositasa.component';

describe('RogzitettAdatokModositasaComponent', () => {
  let component: RogzitettAdatokModositasaComponent;
  let fixture: ComponentFixture<RogzitettAdatokModositasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RogzitettAdatokModositasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RogzitettAdatokModositasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

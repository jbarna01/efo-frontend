import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunkaorakNyomtatasaComponent } from './munkaorak-nyomtatasa.component';

describe('MunkaorakNyomtatasaComponent', () => {
  let component: MunkaorakNyomtatasaComponent;
  let fixture: ComponentFixture<MunkaorakNyomtatasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunkaorakNyomtatasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunkaorakNyomtatasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

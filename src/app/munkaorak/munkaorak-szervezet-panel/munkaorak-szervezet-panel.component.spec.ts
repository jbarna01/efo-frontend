import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunkaorakSzervezetPanelComponent } from './munkaorak-szervezet-panel.component';

describe('MunkaorakSzervezetPanelComponent', () => {
  let component: MunkaorakSzervezetPanelComponent;
  let fixture: ComponentFixture<MunkaorakSzervezetPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunkaorakSzervezetPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunkaorakSzervezetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

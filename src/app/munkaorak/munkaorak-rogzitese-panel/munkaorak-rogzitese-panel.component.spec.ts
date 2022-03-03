import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunkaorakRogzitesePanelComponent } from './munkaorak-rogzitese-panel.component';

describe('MunkaorakRogzitesePanelComponent', () => {
  let component: MunkaorakRogzitesePanelComponent;
  let fixture: ComponentFixture<MunkaorakRogzitesePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunkaorakRogzitesePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunkaorakRogzitesePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegerrositesDialogComponent } from './megerrosites-dialog.component';

describe('MegerrositesDialogComponent', () => {
  let component: MegerrositesDialogComponent;
  let fixture: ComponentFixture<MegerrositesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegerrositesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MegerrositesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

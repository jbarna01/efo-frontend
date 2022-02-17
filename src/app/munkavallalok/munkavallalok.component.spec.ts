import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunkavallalokComponent } from './munkavallalok.component';

describe('MunkavallalokComponent', () => {
  let component: MunkavallalokComponent;
  let fixture: ComponentFixture<MunkavallalokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunkavallalokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunkavallalokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

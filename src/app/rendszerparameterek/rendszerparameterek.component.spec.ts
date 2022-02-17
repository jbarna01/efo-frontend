import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendszerparameterekComponent } from './rendszerparameterek.component';

describe('RendszerparameterekComponent', () => {
  let component: RendszerparameterekComponent;
  let fixture: ComponentFixture<RendszerparameterekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendszerparameterekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendszerparameterekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

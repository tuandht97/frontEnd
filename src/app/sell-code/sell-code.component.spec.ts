import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCodeComponent } from './sell-code.component';

describe('SellCodeComponent', () => {
  let component: SellCodeComponent;
  let fixture: ComponentFixture<SellCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

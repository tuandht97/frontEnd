import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorytranComponent } from './historytran.component';

describe('HistorytranComponent', () => {
  let component: HistorytranComponent;
  let fixture: ComponentFixture<HistorytranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorytranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorytranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

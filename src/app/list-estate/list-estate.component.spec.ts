import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstateComponent } from './list-estate.component';

describe('ListEstateComponent', () => {
  let component: ListEstateComponent;
  let fixture: ComponentFixture<ListEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

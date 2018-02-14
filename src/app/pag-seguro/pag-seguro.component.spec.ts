import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagSeguroComponent } from './pag-seguro.component';

describe('PagSeguroComponent', () => {
  let component: PagSeguroComponent;
  let fixture: ComponentFixture<PagSeguroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagSeguroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

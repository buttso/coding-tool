import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHostComponent } from './public-host.component';

describe('PublicHostComponent', () => {
  let component: PublicHostComponent;
  let fixture: ComponentFixture<PublicHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

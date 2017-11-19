import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeButtonsComponent } from './code-buttons.component';

describe('CodeButtonsComponent', () => {
  let component: CodeButtonsComponent;
  let fixture: ComponentFixture<CodeButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

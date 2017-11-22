import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeToolHostComponent } from './code-tool-host.component';

describe('CodeToolComponent', () => {
  let component: CodeToolHostComponent;
  let fixture: ComponentFixture<CodeToolHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeToolHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeToolHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

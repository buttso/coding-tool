import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureMediaPlayerComponent } from './azure-media-player.component';

describe('MediaPresenterComponent', () => {
  let component: AzureMediaPlayerComponent;
  let fixture: ComponentFixture<AzureMediaPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzureMediaPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzureMediaPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPlayerControlsComponent } from './media-player-controls.component';


describe('TimerControlsComponent', () => {
  let component: MediaPlayerControlsComponent;
  let fixture: ComponentFixture<MediaPlayerControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPlayerControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPlayerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

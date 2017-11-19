import { Component, EventEmitter, Output } from '@angular/core';
import { IMediaPlayerControls } from '../../../../typings/domain';

@Component({
  selector: 'media-player-controls',
  templateUrl: './media-player-controls.component.html',
  styles: []
})
export class MediaPlayerControlsComponent implements IMediaPlayerControls {

  @Output() onplay = new EventEmitter(); // TODO: strong typed event args
  @Output() onpause = new EventEmitter(); // TODO: strong typed event args
  @Output() onreset = new EventEmitter(); // TODO: strong typed event args

  currentMode = 'stop';

  constructor() {
  }

  canPlay = () => this.currentMode === 'pause' || this.currentMode === 'stop';
  canPause = () => this.currentMode === 'play';
  canStop = () => this.currentMode === 'play' || this.currentMode === 'pause';

  play(): void {
    this.currentMode = 'play';
    this.onplay.emit({});
  }

  pause(): void {
    this.currentMode = 'pause';
    this.onpause.emit({});
  }

  stop() {
    this.currentMode = 'stop';
    this.onreset.emit({});
  }
}

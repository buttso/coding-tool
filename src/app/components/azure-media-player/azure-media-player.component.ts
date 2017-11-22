/// <reference path="../../../../typings/azuremediaplayer" />

import { Component, OnInit, EventEmitter } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { IMediaPlayer, IMediaPlayerControls } from '../../../../typings/domain';

@Component({
  selector: 'azure-media-player',
  templateUrl: './azure-media-player.component.html',
  styles: []
})
export class AzureMediaPlayerComponent implements OnInit, IMediaPlayer, IMediaPlayerControls {

  player: amp.Player;

  onplay = new EventEmitter(); // TODO: strong typed event args
  onpause = new EventEmitter(); // TODO: strong typed event args
  onreset = new EventEmitter(); // TODO: strong typed event args
  
  constructor(private timerService: TimerService) { }

  ngOnInit() {

    let myOptions = {
      "nativeControlsForTouch": false,
      controls: true,
      autoplay: false,
      poster: "https://openclipart.org/image/2400px/svg_to_png/272339/angular.png",
      height:680,
      width: 800
    };

    this.player = amp("azuremediaplayer", myOptions);
    this.player.src([
      {
        "src": "//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest",
        "type": "application/vnd.ms-sstr+xml"
      }
    ]);

    this.player.addEventListener('timeupdate', e => {
      let currentTime = this.player.currentTime();
      this.timerService.setTime(currentTime);
    });

    console.log('player initialized')
  }

  play(): void {
    console.info(this)
    this.player.play();
  }

  // This is the pause function
  pause(): void {
    console.info('receiving pause')
    this.player.pause();
  }

  reset() {
    console.info('receiving reset')
    this.player.pause();
    this.player.currentTime(0);
  }

  paused(): boolean {
    return this.player.paused();
  }

  duration(): number {
    return this.player.currentMediaTime();
  }

  currentTime(seconds?: number): number {
    if (seconds && typeof seconds == "number")
      this.player.currentTime(seconds);
    else  
      return this.player.currentTime();
  }
    
  media(source?: string, type?: string) {

    if (source && type)
    {
      this.player.src([
        {
          "src": source,
          "type": type
        }
      ]);
    }
    else  
    return this.player.currentSrc();    
  }


  private onPlayClick(): void {
    this.player.play();
    this.onplay.emit({});
  }

  private onPauseClick(): void {
    this.player.pause();
    this.onpause.emit({});
  }

  private onResetClick() {
    this.player.pause();
    this.player.currentTime(0);
    this.onpause.emit({});
  }
}

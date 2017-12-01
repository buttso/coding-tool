/// <reference path="../../typings/azuremediaplayer" />

import { Component, OnInit, EventEmitter } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { IMediaPlayer, IMediaPlayerControls, ICodingEvent } from '../../typings/domain';
import { TimelineEventService } from '../../services/timeline-event.service';

@Component({
  selector: 'azure-media-player',
  templateUrl: './azure-media-player.component.html',
  styles: ['./azure-media-player.component.css']
})
export class AzureMediaPlayerComponent implements OnInit, IMediaPlayer, IMediaPlayerControls {

  player: amp.Player;

  onplay = new EventEmitter(); // TODO: strong typed event args
  onpause = new EventEmitter(); // TODO: strong typed event args
  onreset = new EventEmitter(); // TODO: strong typed event args
  
  constructor(private videoService: TimerService, private timelineEventService: TimelineEventService) {
    this.timelineEventService.navigateTo$.subscribe(
      codingEvent => {
        this.navigateTo(codingEvent);
      });
  }

  ngOnInit() {

    let playerOptions = {
      "nativeControlsForTouch": false,
        controls: true,
        autoplay: false,
        width: "100%",
        height: "100%",
        poster: "https://openclipart.org/image/1200px/svg_to_png/272339/angular.png"
    };

    let hockeySrc = "https://codingtoolproto.blob.core.windows.net/asset-a5cee9d2-664a-4a0e-9422-bb2ddc40c5b8?sv=2015-07-08&sr=c&si=90089173-fd33-4b94-85f0-a4aff1b2f8ad&sig=2ylsqIcKVfeaUw6d5qKD%2FEc7VjkJLMZsRPjvCe23npg%3D&st=2017-11-27T22%3A39%3A18Z&se=2117-11-27T22%3A39%3A18Z"
    let sampleSrc = "//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest";

    this.player = amp("azuremediaplayer", playerOptions);
    

    this.player.addEventListener('timeupdate', e => {
      let currentTime = this.player.currentTime();
      this.videoService.setTime(currentTime);
    });

    this.player.addEventListener('durationchange', (e:ProgressEvent) => {
      console.log('firing')
      this.timelineEventService.mediaLoaded({duration: this.player.duration()});
    });

    this.player.src([
      {
        "src": sampleSrc,
        "type": "application/vnd.ms-sstr+xml"
      }
    ]);
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


  navigateTo(codingEvent: ICodingEvent): void {
    console.info(codingEvent.time);
    this.currentTime(codingEvent.time);
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

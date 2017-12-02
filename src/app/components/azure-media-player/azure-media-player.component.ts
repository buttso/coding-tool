/// <reference path="../../typings/azuremediaplayer" />

import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { IMediaPlayer, IMediaPlayerControls, ICodingEvent } from '../../typings/domain';
import { TimelineEventService } from '../../services/timeline-event.service';
import { IMediaSource } from '../../typings/model-metadata';

@Component({
  selector: 'azure-media-player',
  templateUrl: './azure-media-player.component.html',
  styles: ['./azure-media-player.component.css']
})
export class AzureMediaPlayerComponent implements OnInit, IMediaPlayer, IMediaPlayerControls {

  @Input() source: IMediaSource;

  player: amp.Player;

  onplay = new EventEmitter(); // TODO: strong typed event args
  onpause = new EventEmitter(); // TODO: strong typed event args
  onreset = new EventEmitter(); // TODO: strong typed event args
  
  constructor(private timerService: TimerService, private timelineEventService: TimelineEventService) {
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
    
    this.player = amp("azuremediaplayer", playerOptions);
    

    this.player.addEventListener('timeupdate', e => {
      let currentTime = this.player.currentTime();
      this.timerService.setTime(currentTime);
    });

    this.player.addEventListener('durationchange', (e:ProgressEvent) => {
      console.log('firing')
      this.timelineEventService.mediaLoaded({duration: this.player.duration()});
    });

    this.player.src(this.source);
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

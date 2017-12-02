/// <reference path="../../typings/azuremediaplayer" />

import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { IMediaPlayer, IMediaPlayerControls, ICodingEvent } from '../../typings/domain';
import { TimelineEventService } from '../../services/timeline-event.service';
import { IMediaSource } from '../../typings/model-metadata';

@Component({
  selector: 'azure-media-player',
  templateUrl: './azure-media-player.component.html',
  styles: []
})
export class AzureMediaPlayerComponent implements OnInit, IMediaPlayer, IMediaPlayerControls {

  @Input() source: IMediaSource;

  player: amp.Player;

  onplay = new EventEmitter(); // TODO: strong typed event args
  onpause = new EventEmitter(); // TODO: strong typed event args
  onreset = new EventEmitter(); // TODO: strong typed event args

  constructor(private timerService: TimerService, private timelineEventService: TimelineEventService) {
    timelineEventService.navigateTo$.subscribe((codingEvent: ICodingEvent) => {
        this.navigateTo(codingEvent);
      });
  }

  ngOnInit() {

    let playerOptions = {
      "nativeControlsForTouch": false,
      controls: true,
      autoplay: false,
      playbackSpeed: {
        enabled: true,
        initialSpeed: 1.0,
        speedLevels: [
          { name: "x4.0", value: 4.0 },
          { name: "x3.0", value: 3.0 },
          { name: "x2.0", value: 2.0 },
          { name: "x1.75", value: 1.75 },
          { name: "x1.5", value: 1.5 },
          { name: "x1.25", value: 1.25 },
          { name: "normal", value: 1.0 },
          { name: "x0.75", value: 0.75 },
          { name: "x0.5", value: 0.5 },
        ]
      },
      width: "100%",
      height: "100%",
      poster: "https://openclipart.org/image/1200px/svg_to_png/272339/angular.png"
    };

    this.player = amp("azuremediaplayer", playerOptions);

    this.player.addEventListener('timeupdate', e => {
      let currentTime = this.player.currentTime();
      this.timerService.setTime(currentTime);
    });

    this.player.addEventListener('durationchange', (e: ProgressEvent) => {
      this.timelineEventService.mediaLoaded({ duration: this.player.duration() });
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

    if (source && type) {
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

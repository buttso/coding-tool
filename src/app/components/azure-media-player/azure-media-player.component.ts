/// <reference path="../../typings/azuremediaplayer" />

import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { IMediaPlayer, IMediaPlayerControls, ICodingEvent } from '../../typings/domain';
import { TimelineEventService } from '../../services/timeline-event.service';
import { IMediaSource, IMatchMetadata, ICodedEventItem } from '../../typings/model-metadata';

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
      timelineEventService.navigateTo$.subscribe((codingEvent: ICodedEventItem) => {
        this.navigateTo(codingEvent);
      });

      timelineEventService.matchChanged$.subscribe((matchMetadata: IMatchMetadata) => {
        this.changeMedia(matchMetadata.media);
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

    /* docs: http://amp.azure.net/libs/amp/latest/docs/index.html */
    /* samples: https://azure.microsoft.com/en-us/resources/samples/?service=media-services&sort=0 */
    this.player = amp("azuremediaplayer", playerOptions);

    this.player.addEventListener('timeupdate', e => {
      let currentTime = this.player.currentTime();
      this.timerService.setTime(currentTime);
    });
    
    this.player.addEventListener('durationchange', (e: ProgressEvent) => {
      const duration = this.player.duration();
      console.info(`[video loaded] duration: ${duration}`)
      this.timelineEventService.mediaLoaded({ duration: duration });
    });
    
    console.info(`[player] setting source: ${this.source.src}; ${this.source.type}`)

    // this.player.src(this.source);
    // this.player.src([{ src: this.source.src, type: this.source.type } ]);
    this.player.src([{ src: '//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest',
                       type: 'application/vnd.ms-sstr+xml' } ]);
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

  changeMedia(mediaSource: IMediaSource) {
    this.media(mediaSource.src, mediaSource.type);
  }


  navigateTo(codingEvent: ICodedEventItem): void {
    console.info(codingEvent.seconds);
    this.currentTime(codingEvent.seconds);
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

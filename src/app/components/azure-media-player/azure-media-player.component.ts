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
    
    let prelimFinalSrc = {
      src: "https://codingtoolproto.blob.core.windows.net/asset-f44bed4f-598a-4467-94c3-503426b3f1e9/R24_PF_AHCvFHC_FullGame.mp4?sv=2015-07-08&sr=c&si=cb841b3c-ffc9-4d6f-b18c-188877b38fa8&sig=frdhRSpqbMGHjVuJVIRbwjjhx4HyKJx2nit71zSv0F0%3D&st=2017-11-28T05%3A31%3A15Z&se=2117-11-28T05%3A31%3A15Z",
      type: "video/mp4"
    }

    let grandFinalSrc = {
      src: "https://codingtoolproto.blob.core.windows.net/asset-883ab032-7cb1-4d85-b6fb-e882a8c8ae2d/R25_GF_SHCvAHC_FullGame_1920x1080_AACAudio_5690.mp4?sv=2015-07-08&sr=c&si=3701f404-eb15-4ab8-8b7d-4a2648be8db7&sig=lXNXI3xytOuT7fWayOOcTdZqBYW3m5H%2B2d0oCaxaZqI%3D&st=2017-11-28T20%3A57%3A26Z&se=2117-11-28T20%3A57%3A26Z",
      type: "video/mp4"
    }

    let sampleSrc = {
      src: "//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest",
      type: "application/vnd.ms-sstr+xml"
    }

    this.player = amp("azuremediaplayer", playerOptions);
    

    this.player.addEventListener('timeupdate', e => {
      let currentTime = this.player.currentTime();
      this.videoService.setTime(currentTime);
    });

    this.player.addEventListener('durationchange', (e:ProgressEvent) => {
      console.log('firing')
      this.timelineEventService.mediaLoaded({duration: this.player.duration()});
    });

    this.player.src([prelimFinalSrc]);
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

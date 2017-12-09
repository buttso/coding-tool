import { Component, OnInit, Input } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { IMediaSource, ICodedEventItem, IMatchMetadata } from '../../typings/model-metadata';
import { TimelineEventService } from '../../services/timeline-event.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styles: []
})
export class VideoPlayerComponent implements OnInit {

  @Input() source: IMediaSource;
  api:VgAPI;

  constructor(private timerService: TimerService, private timelineEventService: TimelineEventService) {
    timelineEventService.navigateTo$.subscribe((codingEvent: ICodedEventItem) => {
      this.navigateTo(codingEvent);
    });

    timelineEventService.matchChanged$.subscribe((matchMetadata: IMatchMetadata) => {
      this.changeMedia(matchMetadata.media);
    });
  }

  ngOnInit() {
    console.info(`[player] setting source: ${this.source.src}; ${this.source.type}`)

    // this.player.src(this.source);
    // this.player.src([{ src: this.source.src, type: this.source.type } ]);
    // this.player.src([{ src: '//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest',
    //                    type: 'application/vnd.ms-sstr+xml' } ]);
  }


  onPlayerReady(api:VgAPI) {
    this.api = api;
    console.info('vg:loaded');

    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
      () => {
        const currentTime = this.api.currentTime;
        console.info(`vg:currentTimeChanged ${currentTime}`)
        this.timerService.setTime(currentTime);
      }
    );

    this.api.getDefaultMedia().subscriptions.durationChange.subscribe(
      () => {
        const duration = this.api.duration;
        console.info(`vg:durationChanged ${duration}`)
        this.timelineEventService.mediaLoaded({ duration: duration });
      }
    );
  }


  changeMedia(mediaSource: IMediaSource) {
    // this.media(mediaSource.src, mediaSource.type);
    console.log(`vg:mediaChanged`)
  }


  navigateTo(codingEvent: ICodedEventItem): void {
    // this.currentTime(codingEvent.seconds);
    console.log(`vg:navigateTo ${codingEvent.seconds}`)
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICodeToolHostComponent, ICodingEvent, IButtonConfiguration } from '../../typings/domain';
import { TimerService } from '../../services/timer.service';
import { MediaPlayerControlsComponent } from '../media-player-controls/media-player-controls.component';
import { AzureMediaPlayerComponent } from '../azure-media-player/azure-media-player.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { TimelineEventService } from '../../services/timeline-event.service';
import { IMatchMetadata, IMediaSource, IMatchProperties } from '../../typings/model-metadata';
import { MatchDataService } from '../../services/match-data.service';

@Component({
  selector: 'code-tool-host',
  templateUrl: './code-tool-host.component.html',
  styles: ['./code-tool-host.component.css'],
  providers: [
    // AzureMediaPlayerComponent, 
    // MediaPlayerControlsComponent, 
    // TimelineComponent
  ]
})
export class CodeToolHostComponent implements OnInit, OnDestroy, ICodeToolHostComponent {
  
  private playerPlayHandle: any;
  private playerPausedHandle: any;
  private playerResetHandle: any;
  private timerChangedHandle: any;

  selectedButtonConfiguration: IButtonConfiguration[];
  private currentMatch: IMatchMetadata;

  constructor(
    private timerService: TimerService, 
    // private mediaPlayer: AzureMediaPlayerComponent, 
    // private mediaPlayerControls: MediaPlayerControlsComponent,
    // private timeline: TimelineComponent,
    private matchDataService: MatchDataService) { }

  ngOnInit() {
    // this.playerPlayHandle = this.mediaPlayer.onplay.subscribe((args: any) => this.playerPlay(args));
    // this.playerPausedHandle = this.mediaPlayer.onpause.subscribe((args: any) => this.playerPaused(args));
    // this.playerResetHandle = this.mediaPlayer.onreset.subscribe((args: any) => this.playerReset(args));
    this.timerChangedHandle = this.timerService.onTimeChange.subscribe((args: any) => this.timerChanged(args));

    this.setCurrentMatch("1");
}

  ngOnDestroy() {
    this.playerPlayHandle.unsubscribe();
    this.playerPausedHandle.unsubscribe();
    this.playerResetHandle.unsubscribe();
    this.timerChangedHandle.unsubscribe();
  }

  setCurrentMatch(identifier: string) {
    let currentMatch = this.matchDataService.getMatch(identifier);
    this.currentMatch = currentMatch;
    this.selectedButtonConfiguration = this.currentMatch.buttonConfiguration; 
  }



  timerChanged(args: any): any {
    console.log('CodeTool - Timer Change')
  }


    // playerPlay(args: any): any {
  //   console.log('CodeTool - Player Play')
  //   this.mediaPlayer.play();
  // }

  // playerPaused(args: any): any {
  //   console.log('CodeTool - Player Pause')
  //   this.mediaPlayer.pause();
  // }

  // playerReset(args: any): any {
  //   console.log('CodeTool - Player Reset')
  //   this.mediaPlayer.reset();
  // }

  // onPlay(args: any): void {
  //   console.info('handling play')
  //   this.mediaPlayer.play();
  // } 

  // onPause(args: any): void {
  //   console.info('handling pause')
  //   this.mediaPlayer.pause();
  // } 

  // onReset(args: any): void {
  //   console.info('handling reset')
  //   this.mediaPlayer.reset();
  // } 
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICodeToolHostComponent, ICodingEvent, IButtonConfiguration } from '../../typings/domain';
import { MediaPlayerControlsComponent } from '../media-player-controls/media-player-controls.component';
import { TimerService } from '../../services/timer.service';
import { AzureMediaPlayerComponent } from '../azure-media-player/azure-media-player.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { TimelineEventService } from '../../services/timeline-event.service';

@Component({
  selector: 'code-tool-host',
  templateUrl: './code-tool-host.component.html',
  styles: [],
  providers: [
    AzureMediaPlayerComponent, 
    MediaPlayerControlsComponent, 
    TimelineEventService,
    TimelineComponent
  ]
})
export class CodeToolHostComponent implements OnInit, OnDestroy, ICodeToolHostComponent {
  
  private playerPlayHandle: any;
  private playerPausedHandle: any;
  private playerResetHandle: any;
  private timerChangedHandle: any;

  selectedButtonConfiguration: IButtonConfiguration[];

  constructor(
    private timerService: TimerService, 
    private mediaPlayer: AzureMediaPlayerComponent, 
    private mediaPlayerControls: MediaPlayerControlsComponent,
    private timeline: TimelineComponent) { }

  ngOnInit() {
    this.playerPlayHandle = this.mediaPlayer.onplay.subscribe((args: any) => this.playerPlay(args));
    this.playerPausedHandle = this.mediaPlayer.onpause.subscribe((args: any) => this.playerPaused(args));
    this.playerResetHandle = this.mediaPlayer.onreset.subscribe((args: any) => this.playerReset(args));
    this.timerChangedHandle = this.timerService.onTimeChange.subscribe((args: any) => this.timerChanged(args));

    this.selectedButtonConfiguration = this.createDefaultButtonConfiguration();
  }

  ngOnDestroy() {
    this.playerPlayHandle.unsubscribe();
    this.playerPausedHandle.unsubscribe();
    this.playerResetHandle.unsubscribe();
    this.timerChangedHandle.unsubscribe();
  }

  playerPlay(args: any): any {
    console.log('CodeTool - Player Play')
    this.mediaPlayer.play();
  }

  playerPaused(args: any): any {
    console.log('CodeTool - Player Pause')
    this.mediaPlayer.pause();
  }

  playerReset(args: any): any {
    console.log('CodeTool - Player Reset')
    this.mediaPlayer.reset();
  }

  timerChanged(args: any): any {
    console.log('CodeTool - Timer Change')
  }

  // handles event from code-buttons and adds it to the Timeline
  // onCodeEvent(codingEvent: ICodingEvent): void {
  //   console.log(`Event added for ${codingEvent.eventType}`)
  //   this.timeline.addCodingEvent(codingEvent);
  // } 


  onPlay(args: any): void {
    console.info('handling play')
    this.mediaPlayer.play();
  } 

  onPause(args: any): void {
    console.info('handling pause')
    this.mediaPlayer.pause();
  } 

  onReset(args: any): void {
    console.info('handling reset')
    this.mediaPlayer.reset();
  } 

  createDefaultButtonConfiguration(): IButtonConfiguration[] {
    return [
      {eventType: "A", color: "Blue", lagSeconds: 5, leadSeconds: 5},
      {eventType: "B", color: "Blue", lagSeconds: 5, leadSeconds: 5},
      {eventType: "C", color: "Blue", lagSeconds: 5, leadSeconds: 5},
      {eventType: "D", color: "Blue", lagSeconds: 5, leadSeconds: 5}
    ];
  }

}

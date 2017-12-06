import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICodeToolHostComponent } from '../../typings/domain';
import { TimerService } from '../../services/timer.service';
import { IMatchMetadata } from '../../typings/model-metadata';
import { MatchDataService } from '../../services/match-data.service';
import { TimelineEventService } from '../../services/timeline-event.service';
import { MatDialog } from '@angular/material';
import { AddGameDialog } from './add-game-dialog.component';
import { CreateGameModel } from '../../models/create-game-model';



@Component({
  selector: 'code-tool-host',
  templateUrl: './code-tool-host.component.html',
  styles: [],
  providers: []
})
export class CodeToolHostComponent implements OnInit, OnDestroy, ICodeToolHostComponent {

  private timerChangedHandle: any;
  currentMatch: IMatchMetadata;
  allMatches: IMatchMetadata[];
  opened = false;

  constructor(private timerService: TimerService, 
      private matchDataService: MatchDataService,
      private timelineEventService: TimelineEventService,
      public dialog: MatDialog) { }

  ngOnInit() {
    this.timerChangedHandle = this.timerService.onTimeChange.subscribe((args: number) => this.timerChanged(args));
    this.allMatches = this.matchDataService.getAllMatches();
    this.setCurrentMatch("1");
  }

  ngOnDestroy() {
    this.timerChangedHandle.unsubscribe();
  }

  setCurrentMatch(identifier: string) {
    this.currentMatch = this.matchDataService.getMatch(identifier);
  }

  timerChanged(args: any): void {
    console.log('CodeTool - Timer Change')
  }

  onGameChanged(game: IMatchMetadata){
   this.timelineEventService.matchChanged(game);
  }


  newGame(): void {
    let dialogRef = this.dialog.open(AddGameDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result: CreateGameModel) => {
      console.log(result);
    });
  }

}





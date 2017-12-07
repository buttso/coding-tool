import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICodeToolHostComponent } from '../../typings/domain';
import { TimerService } from '../../services/timer.service';
import { IMatchMetadata } from '../../typings/model-metadata';
import { MatchService } from '../../services/match.service';
import { TimelineEventService } from '../../services/timeline-event.service';
import { MatDialog } from '@angular/material';
import { AddGameDialog } from './add-game-dialog.component';
import { CreateGameModel } from '../../models/create-game-model';


import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'code-tool-host',
  templateUrl: './code-tool-host.component.html',
  styleUrls: ['./code-tool-host.component.css'],
  providers: []
})
export class CodeToolHostComponent implements OnInit, OnDestroy, ICodeToolHostComponent {

  private timerChangedHandle: any;
  currentMatch: IMatchMetadata;
  allMatches$: Observable<IMatchMetadata[]>;
  opened = true;

  constructor(
      public authService: AuthService,
      private timerService: TimerService, 
      private matchDataService: MatchService,
      private timelineEventService: TimelineEventService,
      public dialog: MatDialog
    ) { }

    

  ngOnInit() {
    this.timerChangedHandle = this.timerService.onTimeChange.subscribe((args: number) => this.timerChanged(args));
    this.allMatches$ = this.matchDataService.getAllMatches();

    
    
    // this.setCurrentMatch("1");
  }

  ngOnDestroy() {
    this.timerChangedHandle.unsubscribe();
  }

  // setCurrentMatch(identifier: string) {
  //   this.currentMatch = this.matchDataService.getMatch(identifier);
  // }

  timerChanged(args: any): void {
    console.log('CodeTool - Timer Change')
  }

  onGameChanged(){
   this.timelineEventService.matchChanged(this.currentMatch);
  }


  newGame(): void {
    let dialogRef = this.dialog.open(AddGameDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result: CreateGameModel) => {
      // db.collection('items').valueChanges()
      //   .subscribe(console.log);
    });
  }

}





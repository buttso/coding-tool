import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICodeToolHostComponent, IButtonConfiguration } from '../../typings/domain';
import { TimerService } from '../../services/timer.service';
import { IMatchMetadata } from '../../typings/model-metadata';
import { MatchService } from '../../services/match.service';
import { TimelineEventService } from '../../services/timeline-event.service';
import { MatDialog } from '@angular/material';
import { AddGameDialog } from '../dialogs/add-game-dialog.component';
import { CreateGameModel } from '../../models/create-game-model';


import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EditGameDialog } from '../dialogs/edit-game-dialog.component';
import { EditGameModel } from '../../models/edit-game-model';



@Component({
  selector: 'code-tool-host',
  templateUrl: './code-tool-host.component.html',
  styleUrls: ['./code-tool-host.component.css'],
  providers: []
})
export class CodeToolHostComponent implements OnInit, OnDestroy, ICodeToolHostComponent {

  private timerChangedHandle: any;
  currentMatch: IMatchMetadata;
  opened = true;

  isNewMatch: boolean;
  matchKey: string;

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      public authService: AuthService,
      private timerService: TimerService, 
      private matchService: MatchService,
      private timelineEventService: TimelineEventService,
      public dialog: MatDialog
    ) { }

    

  ngOnInit() {
    this.timerChangedHandle = this.timerService.onTimeChange.subscribe((args: number) => this.timerChanged(args));
    
    this.matchKey = this.activatedRoute.snapshot.params['id'];
    this.isNewMatch = this.matchKey === 'new';
    if (!this.isNewMatch) { this.getMatch(); };
  }

  getMatch() {
    console.log(`[host] getting match`)
    this.matchService.getMatch(this.matchKey)
      .subscribe(match => {
        if(match.events == undefined) {
          match.events = [];
        }
        console.log(`[host] match retrieved`)
        console.info(match)
        this.currentMatch = match;
      });
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

  editGame(): void {
    let dialogRef = this.dialog.open(EditGameDialog, {
      data: this.currentMatch
    });

    dialogRef.afterClosed().subscribe((match: IMatchMetadata) => {
      if(match !== undefined) {
        this.currentMatch = match;
        console.log(this.currentMatch)
        
        // this.matchService.updateMatch(this.currentMatch);
      }
      
    });
  }


  newGame(): void {
    let dialogRef = this.dialog.open(AddGameDialog);

    // dialogRef.afterClosed().subscribe((match: IMatchMetadata) => {
    //   if(match !== undefined) {
    //     this.matchService.addMatch(match);
    //   }
    // });
  }
}

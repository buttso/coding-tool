import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICodeToolHostComponent } from '../../typings/domain';
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
      data: this.currentMatch,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((model: EditGameModel) => {
      this.currentMatch.properties.date = model.matchDate.toString();
      this.currentMatch.properties.awayTeam = model.awayTeam;
      this.currentMatch.properties.grade = model.grade;
      this.currentMatch.properties.homeTeam = model.homeTeam;
      this.currentMatch.properties.venue = model.venue;
      this.currentMatch.media.src = model.videoUrl;
      this.currentMatch.media.type = model.videoType;
      this.currentMatch.properties.matchName = `${model.homeTeam} vs ${model.awayTeam}`;
      this.currentMatch.$key = this.matchKey;

      console.log(this.currentMatch)
      
      this.matchService.updateMatch(this.currentMatch);
    });
  }


  newGame(): void {
    let dialogRef = this.dialog.open(AddGameDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result: CreateGameModel) => {
      let match = {
        properties: {
          awayTeam: result.awayTeam,
          date: result.matchDate.toString(),
          grade: '',
          homeTeam: result.homeTeam,
          matchName: `${result.homeTeam} vs ${result.awayTeam}`,
          roundNumber: 0,
          venue: result.venue,
          year: result.matchDate.getFullYear()
        },
        media: {
          src: result.videoUrl,
          type: result.videoType,
          offlineSrc: '' 
        },
        events: [],
        buttonConfiguration: []
      } as IMatchMetadata;

      this.matchService.addMatch(match);
    });
  }


  getMatch() {
    this.matchService.getMatch(this.matchKey)
      .subscribe(match => {
        this.currentMatch = match;
      });
  }

}





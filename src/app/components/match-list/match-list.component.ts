import { Component, OnInit } from '@angular/core';
import { IMatchMetadata } from '../../typings/model-metadata';
import { MatchService } from '../../services/match.service';
import { MatDialog } from '@angular/material';
import { AddGameDialog } from '../dialogs/add-game-dialog.component';
import { CreateGameModel } from '../../models/create-game-model';
import { AuthService } from '../../services/auth.service';
import { IButtonConfiguration } from '../../typings/domain';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matches: IMatchMetadata[];

  constructor(private matchService: MatchService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.matchService.getMatches().subscribe(matches => {
      this.matches = matches;
    });
  }

  deleteMatch(match: IMatchMetadata): void {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.matchService.deleteMatch(match);
    }
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
        buttonConfiguration: this.getDefaultButtons()
      } as IMatchMetadata;

      this.matchService.addMatch(match);
    });
  }

  getDefaultButtons(): IButtonConfiguration[] {
    return [
      { eventType: "Press", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Outlet", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Circle Entry For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Circle Entry Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Goal Shot Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Goal Shot For.", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Goal For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Goal Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "APC", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "DPC", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Special", color: "red", lagSeconds: 5, leadSeconds: 5 },
    ];
  }
}

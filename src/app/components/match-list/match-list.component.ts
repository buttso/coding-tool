import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IMatchMetadata } from '../../typings/model-metadata';
import { MatchService } from '../../services/match.service';
import { MatDialog } from '@angular/material';
import { AddGameDialog } from '../code-tool-host/add-game-dialog.component';
import { CreateGameModel } from '../../models/create-game-model';
import { IButtonConfiguration } from '../../typings/domain';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matches$: Observable<IMatchMetadata[]>;

  constructor(private matchDataService: MatchService, public dialog: MatDialog) { }

  ngOnInit() {
    this.matches$ = this.matchDataService.getAllMatches();
  }

  newGame(): void {
    let dialogRef = this.dialog.open(AddGameDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result: CreateGameModel) => {
      // db.collection('items').valueChanges()
      //   .subscribe(console.log);
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
          type: 'video/mp4',
          offlineSrc: '' 
        },
        events: [],
        buttonConfiguration: [] as IButtonConfiguration[]
      } as IMatchMetadata;
      this.matchDataService.addMatch(match);
    });
  }
}

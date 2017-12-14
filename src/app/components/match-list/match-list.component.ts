import { Component, OnInit } from '@angular/core';
import { IMatchMetadata } from '../../typings/model-metadata';
import { MatchService } from '../../services/match.service';
import { MatDialog } from '@angular/material';
import { AddGameDialog } from '../dialogs/add-game-dialog.component';
import { CreateGameModel } from '../../models/create-game-model';
import { AuthService } from '../../services/auth.service';
import { IButtonConfiguration } from '../../typings/domain';
import { EditGameDialog } from '../dialogs/edit-game-dialog.component';
import { ImportEventsDialog } from '../dialogs/import-events-dialog.component';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matches: IMatchMetadata[];
  uid: string;
  loggedIn = false;
  hasMatches = false;
  
  constructor(private matchService: MatchService, public dialog: MatDialog, public authService: AuthService) { }

  ngOnInit() {
    console.log(`[match-list]:init`)
    let user  = this.authService.user$.subscribe(auth => {

      if(auth != null) {
        this.uid = auth.uid;
        this.loggedIn = true;

        this.matchService.getMatches().subscribe(matches => {
          console.log(`setting matches`)
          
          this.matches = matches;
          this.hasMatches = matches.length > 0;
        });
      }else{
        this.uid = '';
        this.matches = [];
        this.loggedIn = false;
        this.hasMatches = false;
      }
    });

    
  }

  deleteMatch(match: IMatchMetadata): void {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.matchService.deleteMatch(match);
    }
  }

  importEvents(match: IMatchMetadata): void {
    let dialogRef = this.dialog.open(ImportEventsDialog, {
      data: match
    });

    dialogRef.afterClosed().subscribe((match: IMatchMetadata) => {
      if(match !== undefined) {
        // this.currentMatch = match;
        console.log(`Imported events ${match.$key}`);
      }
      
    });
  }

  editMatch(match: IMatchMetadata): void {
    let dialogRef = this.dialog.open(EditGameDialog, {
      data: match
    });

    dialogRef.afterClosed().subscribe((match: IMatchMetadata) => {
      if(match !== undefined) {
        // this.currentMatch = match;
        console.log(`Updated match ${match.$key}`);
      }
      
    });
  }

  newGame(): void {
    let dialogRef = this.dialog.open(AddGameDialog);
  }

  
}

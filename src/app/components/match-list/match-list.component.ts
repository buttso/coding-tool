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
  uid: string;
  
  constructor(private matchService: MatchService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    console.log(`[match-list]:init`)
    let user  = this.authService.user$.subscribe(auth => {

      if(auth != null) {
        this.uid = auth.uid;

        this.matchService.getMatches().subscribe(matches => {
          console.log(`setting matches`)
          this.matches = matches;
        });
      }else{
        this.uid = '';
        this.matches = [];
      }

      
    
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

    dialogRef.afterClosed().subscribe((match: IMatchMetadata) => {
      
      
      this.matchService.addMatch(match);
    });
  }

  
}

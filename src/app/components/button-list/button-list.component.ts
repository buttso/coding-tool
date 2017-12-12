import { Component, OnInit } from '@angular/core';
import { IMatchMetadata } from '../../typings/model-metadata';
import { MatchService } from '../../services/match.service';
import { MatDialog } from '@angular/material';
import { AddGameDialog } from '../dialogs/add-game-dialog.component';
import { EditGameDialog } from '../dialogs/edit-game-dialog.component';
import { AuthService } from '../../services/auth.service';
import { IButtonConfiguration } from '../../typings/domain';
import { ButtonService } from '../../services/button.service';

@Component({
  selector: 'button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css'] 
})
export class ButtonListComponent implements OnInit {

  buttonConfigurations: IButtonConfiguration[];
  uid: string;
  loggedIn = false;
  hasButtons = false;
  
  constructor(private buttonService: ButtonService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    console.log(`[button-list]:init`)
    let user  = this.authService.user$.subscribe(auth => {

      if(auth != null) {
        this.uid = auth.uid;
        this.loggedIn = true;

        this.buttonService.getButtonConfigurations().subscribe(buttons => {
          console.log(`setting buttons`)
          
          this.buttonConfigurations = buttons;
          this.hasButtons = buttons.length > 0;
        });
      }else{
        this.uid = '';
        this.buttonConfigurations = [];
        this.loggedIn = false;
        this.hasButtons = false; 
      }
    });

    
  }

  deleteButtonConfiguration(buttonConfiguration: IButtonConfiguration): void {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.buttonService.deleteButtonConfiguration(buttonConfiguration);
    }
  }

  editButtonConfiguration(buttonConfiguration: IButtonConfiguration): void {
    let dialogRef = this.dialog.open(EditGameDialog, {
      data: buttonConfiguration
    });

    dialogRef.afterClosed().subscribe((buttonConfiguration: IButtonConfiguration) => {
      if(buttonConfiguration !== undefined) {
        // this.currentMatch = match;
        console.log(`Updated button configuration ${buttonConfiguration.$key}`)
      }
      
    });
  }

  newButtonConfiguration(): void {
    let dialogRef = this.dialog.open(AddGameDialog);
  }

}

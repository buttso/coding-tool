import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddButtonSetDialog } from '../dialogs/add-buttonset-dialog.component';
import { EditButtonSetDialog } from '../dialogs/edit-buttonset-dialog.component';
import { AuthService } from '../../services/auth.service';
import { ButtonService } from '../../services/button.service';
import { IMatchMetadata, IButtonConfiguration, ICodingButtonSet } from '../../typings/model-metadata';

@Component({
  selector: 'buttonset-editor',
  templateUrl: './buttonset-editor.component.html',
  styleUrls: ['./buttonset-editor.component.css'] 
})
export class ButtonSetEditorComponent implements OnInit {

  buttonSets: ICodingButtonSet[];
  selectedButtonSet: ICodingButtonSet;
  uid: string;
  loggedIn = false;
  hasButtons = false;
  opened = true;
  
  constructor(private buttonService: ButtonService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    console.log(`[ButtonListComponent]:init`)
    let user  = this.authService.user$.subscribe(auth => {

      if(auth != null) {
        this.uid = auth.uid;
        this.loggedIn = true;

        this.buttonService.getButtonSets().subscribe(buttons => {
          this.buttonSets = buttons;
          this.hasButtons = buttons.length > 0;
        });
      }else{
        this.uid = '';
        this.buttonSets = [];
        this.loggedIn = false;
        this.hasButtons = false; 
      }
    });

    
  }

  deleteButtonSet(buttonSet: ICodingButtonSet): void {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.buttonService.deleteButtonSet(buttonSet);
    }
  }

  editButtonSet(buttonSet: ICodingButtonSet): void {
    let dialogRef = this.dialog.open(EditButtonSetDialog, {
      data: buttonSet
    });

    // dialogRef.afterClosed().subscribe((buttonSet: ICodingButtonSet) => {
    //   if(buttonSet !== undefined) {
    //     console.log(`Updated buttonSet ${buttonSet.$key}`)
    //   }      
    // });
  }

  newButtonSet(): void {
    let dialogRef = this.dialog.open(AddButtonSetDialog);
  }

}

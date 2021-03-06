import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AddButtonSetDialog } from '../dialogs/add-buttonset-dialog.component';
import { EditButtonSetDialog } from '../dialogs/edit-buttonset-dialog.component';
import { AuthService } from '../../services/auth.service';
import { ButtonService } from '../../services/button.service';
import { IMatchMetadata, IButtonConfiguration, ICodingButtonSet } from '../../typings/model-metadata';
import { AddButtonDialog } from '../dialogs/add-button-dialog.component';
import { EditButtonDialog } from '../dialogs/edit-button-dialog.component';

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
  hasButtonSets = false;
  opened = true;

  displayedColumns = ['name', /*'type',*/ 'color', 'lead', 'lag', 'commands'];
  dataSource: MatTableDataSource<IButtonConfiguration> = new MatTableDataSource([]);
  
  constructor(private buttonService: ButtonService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    console.log(`[ButtonSetEditorComponent]:init`);

    let user  = this.authService.user$.subscribe(auth => {
      // this.dataSource = new MatTableDataSource<IButtonConfiguration>([]);

      if(auth != null) {
        this.uid = auth.uid;
        this.loggedIn = true;

        this.buttonService.getButtonSets().subscribe(buttonSets => {
          console.log(`setting buttonSets`)
          
          this.buttonSets = buttonSets;
          this.hasButtonSets = buttonSets.length > 0;
        });
      }else{
        this.uid = '';
        this.buttonSets = [];
        this.loggedIn = false;
        this.hasButtonSets = false;
      }
    });
  }

  deleteButtonSet(buttonSet: ICodingButtonSet): void {
    const response = confirm('are you sure you want to delete this Button Set?');
    if (response ) {
      this.buttonService.deleteButtonSet(buttonSet);
      this.selectedButtonSet = undefined;
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

  compareColor(elementColor: string, compareColor: string): boolean {
    return (elementColor && compareColor && elementColor.toLowerCase() == compareColor.toLowerCase())
  }

  selectButtonSet(buttonSet: ICodingButtonSet): void {
    if(!buttonSet.buttons) {
      console.log('adding buttons');      
      buttonSet.buttons = [];
    }

    buttonSet.buttons = this.buttonService.assertIdenfitiers(buttonSet.buttons);

    this.dataSource.data = buttonSet.buttons;
    this.selectedButtonSet = buttonSet;
    console.log(this.selectedButtonSet)
  }

  addButton(buttonSet: ICodingButtonSet): void {
    let dialogRef = this.dialog.open(AddButtonDialog, {
      data: buttonSet
    });

    dialogRef.afterClosed().subscribe((buttonSet: ICodingButtonSet) => {
      if(buttonSet !== undefined) {
        this.dataSource.data = buttonSet.buttons;
      }      
    });
  }


  editButton(button: IButtonConfiguration): void {
    let dialogRef = this.dialog.open(EditButtonDialog);
    dialogRef.componentInstance.button = button;
    dialogRef.componentInstance.buttonSet = this.selectedButtonSet;

    dialogRef.afterClosed().subscribe((buttonSet: ICodingButtonSet) => {
      if(buttonSet !== undefined) {
        this.dataSource.data = buttonSet.buttons;
      }      
    });
  }

  addDefaultButtons(buttonSet: ICodingButtonSet): void {
    const response = confirm('This will reset buttons for this Button Set to the default buttons.  Press OK to Continue.');
    if (response ) {
      buttonSet.buttons = this.buttonService.getDefaultButtonSet().buttons;
      this.buttonService.updateButtonSet(buttonSet)
      this.dataSource.data = buttonSet.buttons;
    }    
  }

  newButtonSet(): void {
    let dialogRef = this.dialog.open(AddButtonSetDialog);
  }


  deleteButton(button: IButtonConfiguration): void {
    const response = confirm('Are you sure you want to delete this button?');
    if (response ) {
      let newButtons = this.selectedButtonSet.buttons.filter(b => b.name !== button.name);
      this.selectedButtonSet.buttons = newButtons;
      
      this.buttonService.updateButtonSet(this.selectedButtonSet)
        .then(() => this.dataSource.data = this.selectedButtonSet.buttons);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
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
  hasButtonSets = false;
  opened = true;

  displayedColumns = ['name', /*'type',*/ 'color', 'lead', 'lag', 'commands'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
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

  selectButtonSet(buttonSet: ICodingButtonSet): void {
    if(!buttonSet.buttons) {
      console.log('adding buttons')
      buttonSet.buttons = [];
    }
    
    
    // this.dataSource = new MatTableDataSource<IButtonConfiguration>(buttonSet.buttons);
    // this.dataSource.data =  //buttonSet.buttons;
    this.selectedButtonSet = buttonSet;
    console.log(this.selectedButtonSet)
  }

  newButtonSet(): void {
    let dialogRef = this.dialog.open(AddButtonSetDialog);
  }

}


const ELEMENT_DATA: IButtonConfiguration[] = [
  { name: 'Press', color: 'green', eventType: '', type: {name: 'Event'}, leadSeconds: 7, lagSeconds: 8 },
  { name: 'Outlet', color: 'green', eventType: '', type: {name: 'Event'}, leadSeconds: 7, lagSeconds: 8 },
  { name: 'APC', color: 'blue', eventType: '', type: {name: 'Event'}, leadSeconds: 7, lagSeconds: 8 },
  { name: 'DPC', color: 'yellow', eventType: '', type: {name: 'Event'}, leadSeconds: 7, lagSeconds: 8 },
  { name: 'Special', color: 'red', eventType: '', type: {name: 'Event'}, leadSeconds: 7, lagSeconds: 8 }
];

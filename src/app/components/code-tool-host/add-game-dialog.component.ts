import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { CreateGameModel } from '../../models/create-game-model';


@Component({
    selector: 'add-game-dialog',
    templateUrl: './add-game-dialog.html',
    styles: [ ".mat-form-field { display: block }" ]
  })
  export class AddGameDialog implements OnInit {
    
    public model: CreateGameModel;
        
    clubs: string[] = ["Adelaide", "Adelaide Uni", "Burnside", "Forestville", "Grange", "North East", "Port Adelaide", "Seacliff", "Woodville"];
    venues: string[] = ["Adelaide HC", "Adelaide Uni HC", "North East HC", "Port Adelaide HC", "Seacliff HC", "Woodville HC"];
  
    constructor(public dialogRef: MatDialogRef<AddGameDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.model = new CreateGameModel(
            new Date().getMilliseconds().toString(),
            new Date(),
            "",
            "", 
            "",
            "",
            "",
            ""
        );
    }

    onSaveClick(): void {
        this.dialogRef.close(this.model);
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }

  export class Foo {
      first: string;
      second: number;
  }
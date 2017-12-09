import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { IMatchMetadata } from '../../typings/model-metadata';
import { EditGameModel } from '../../models/edit-game-model';


@Component({
    selector: 'edit-game-dialog',
    templateUrl: './edit-game-dialog.html',
    styles: [ ".mat-form-field { display: block }" ]
  })
  export class EditGameDialog implements OnInit {
    
    public model: EditGameModel;
    importedEvents: any;
        
    clubs: string[] = ["Adelaide", "Adelaide Uni", "Burnside", "Forestville", "Grange", "North East", "Port Adelaide", "Seacliff", "Woodville"];
    venues: string[] = ["Adelaide HC", "Adelaide Uni HC", "North East HC", "Port Adelaide HC", "Seacliff HC", "Woodville HC"];
  
    constructor(public dialogRef: MatDialogRef<EditGameDialog>, @Inject(MAT_DIALOG_DATA) public data: IMatchMetadata) { }

    ngOnInit(): void {
        this.model = {
            matchDate: new Date(this.data.properties.date),
            awayTeam: this.data.properties.awayTeam,
            grade: this.data.properties.grade,
            homeTeam: this.data.properties.homeTeam,
            venue: this.data.properties.venue,
            videoUrl: this.data.media.src,
            videoType: this.data.media.type
        } as EditGameModel;
    }

    onSaveClick(): void {
        this.dialogRef.close(this.model);
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }

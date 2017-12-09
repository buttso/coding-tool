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

        this.data.properties.date = this.model.matchDate.toString();
        this.data.properties.awayTeam = this.model.awayTeam;
        this.data.properties.grade = this.model.grade;
        this.data.properties.homeTeam = this.model.homeTeam;
        this.data.properties.venue = this.model.venue;
        this.data.media.src = this.model.videoUrl;
        this.data.media.type = this.model.videoType;
        this.data.properties.matchName = `${this.model.homeTeam} vs ${this.model.awayTeam}`;
     
        if(this.importedEvents !== undefined) {
            let json = JSON.parse(this.importedEvents);
            if(json !== undefined) {
                this.data.events = json.events;
                this.data.buttonConfiguration = json.buttonConfiguration;
            }
        } 

        this.dialogRef.close(this.data);
    }
  
    onNoClick(): void {
        this.dialogRef.close();
    }
  }

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { CreateGameModel } from '../../models/create-game-model';
import { IButtonConfiguration } from '../../typings/domain';
import { IMatchMetadata } from '../../typings/model-metadata';


@Component({
    selector: 'add-game-dialog',
    templateUrl: './add-game-dialog.html',
    styles: [ ".mat-form-field { display: block }" ]
  })
  export class AddGameDialog implements OnInit {
    
    public model: CreateGameModel;
    importedEvents: any;
        
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
            "https://codingtoolproto.blob.core.windows.net/asset-f44bed4f-598a-4467-94c3-503426b3f1e9/R24_PF_AHCvFHC_FullGame.mp4?sv=2015-07-08&sr=c&si=cb841b3c-ffc9-4d6f-b18c-188877b38fa8&sig=frdhRSpqbMGHjVuJVIRbwjjhx4HyKJx2nit71zSv0F0%3D&st=2017-11-28T05%3A31%3A15Z&se=2117-11-28T05%3A31%3A15Z",
            "video/mp4",
            ""
        );
    } 

    onSaveClick(): void {
        let data = {
            properties: {},
            buttonConfiguration: [],
            events: [],
            media: {}
        } as IMatchMetadata;

        data.properties.date = this.model.matchDate.toString();
        data.properties.awayTeam = this.model.awayTeam;
        data.properties.grade = this.model.grade;
        data.properties.homeTeam = this.model.homeTeam;
        data.properties.venue = this.model.venue;
        data.media.src = this.model.videoUrl;
        data.media.type = this.model.videoType;
        data.properties.matchName = `${this.model.homeTeam} vs ${this.model.awayTeam}`;
     
        if(this.importedEvents !== undefined) {
            let json = JSON.parse(this.importedEvents);
            if(json !== undefined) {
                data.events = json.events;
                data.buttonConfiguration = json.buttonConfiguration;
            }
        }else{
            data.buttonConfiguration = this.getDefaultButtons();
        }

        this.dialogRef.close(data);
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    getDefaultButtons(): IButtonConfiguration[] {
        return [
          { eventType: "Press", color: "blue", lagSeconds: 5, leadSeconds: 5 },
          { eventType: "Outlet", color: "blue", lagSeconds: 5, leadSeconds: 5 },
          { eventType: "Circle Entry For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
          { eventType: "Circle Entry Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
          { eventType: "Goal Shot Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
          { eventType: "Goal Shot For.", color: "blue", lagSeconds: 5, leadSeconds: 5 },
          { eventType: "Goal For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
          { eventType: "Goal Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
          { eventType: "APC", color: "blue", lagSeconds: 5, leadSeconds: 5 },
          { eventType: "DPC", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
          { eventType: "Special", color: "red", lagSeconds: 5, leadSeconds: 5 },
        ];
      }
  }
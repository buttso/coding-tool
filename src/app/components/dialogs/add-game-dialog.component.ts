import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { CreateGameModel } from '../../models/create-game-model';
import { IButtonConfiguration } from '../../typings/domain';
import { IMatchMetadata } from '../../typings/model-metadata';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatchService } from '../../services/match.service';


@Component({
    selector: 'add-game-dialog',
    templateUrl: './add-game-dialog.html',
    styles: [ ".mat-form-field { display: block }" ]
  })
  export class AddGameDialog implements OnInit {

    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    importedEvents: any;
    public videoTypes = ['video/mp4']
        
    constructor(private _fb: FormBuilder, 
                public dialogRef: MatDialogRef<AddGameDialog>,
                public matchService: MatchService, 
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {

        this.firstFormGroup = this._fb.group({
            competitionName: ['', Validators.required],
            matchName: ['', Validators.required],
            roundNumber: [''],
            matchDate: ['', Validators.required],
            homeTeam: ['', Validators.required],
            awayTeam: ['', Validators.required],
            venue: ['']
        });

        this.firstFormGroup.controls.matchDate.setValue(new Date());

        this.secondFormGroup = this._fb.group({
            src: ['https://codingtoolproto.blob.core.windows.net/asset-f44bed4f-598a-4467-94c3-503426b3f1e9/R24_PF_AHCvFHC_FullGame.mp4?sv=2015-07-08&sr=c&si=cb841b3c-ffc9-4d6f-b18c-188877b38fa8&sig=frdhRSpqbMGHjVuJVIRbwjjhx4HyKJx2nit71zSv0F0%3D&st=2017-11-28T05%3A31%3A15Z&se=2117-11-28T05%3A31%3A15Z'],
            type: ['video/mp4']
        });
    } 

    onSaveClick(): void {
        let match = {
            userId: '',
            properties: this.firstFormGroup.value,
            buttonConfiguration: [],
            events: [],
            media: this.secondFormGroup.value,
        } as IMatchMetadata;

        let t = new Date(this.firstFormGroup.controls.matchDate.value)
        // console.log(t.toString())

        match.properties.matchDate = t.toString()

        if(this.importedEvents !== undefined) {
            let json = JSON.parse(this.importedEvents);
            if(json !== undefined) {
                match.events = json.events;
                match.buttonConfiguration = json.buttonConfiguration;
            }
        }else{
            match.buttonConfiguration = this.getDefaultButtons();
        }

        this.matchService.addMatch(match)
            .then(() => this.dialogRef.close(match));

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
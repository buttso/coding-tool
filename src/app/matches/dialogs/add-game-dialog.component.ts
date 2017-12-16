import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { CreateGameModel } from '../../models/create-game-model';
import { IMatchMetadata, IButtonConfiguration } from '../../typings/model-metadata';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatchService } from '../../services/match.service';
import { ButtonService } from '../../services/button.service';


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
                private buttonService: ButtonService,
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
            src: ['https://codingtoolproto.blob.core.windows.net/asset-ba8ecd34-d730-4966-9f85-9f4b113b22e7/R9_GRGvAHC_FullGame.mp4?sv=2015-07-08&sr=c&si=baf99b1f-e9f3-456a-aa48-1ed66060be6d&sig=UCEqEhJaE6Uohy%2BxFjrB7vT39XCV60%2FWp%2FSHeBqPbLE%3D&st=2017-12-06T03%3A08%3A54Z&se=2117-12-06T03%3A08%3A54Z'],
            type: ['video/mp4']
        });
    } 

    onSaveClick(): void {
        let match = {
            userId: '',
            properties: this.firstFormGroup.value,
            buttonConfiguration: {},
            events: [],
            media: this.secondFormGroup.value,
        } as IMatchMetadata;

        let t = new Date(this.firstFormGroup.controls.matchDate.value)
        // console.log(t.toString())

        match.properties.matchDate = t.toString()

        if(this.importedEvents !== undefined) 
        {
            let json = JSON.parse(this.importedEvents);
            if(json !== undefined) 
            {
                match.events = json.events;
                match.buttonConfiguration = json.buttonConfiguration;
            }
        }
        else
        {
            match.buttons = this.buttonService.getDefaultButtonSet();
        }

        this.matchService.addMatch(match)
            .then(() => this.dialogRef.close(match));

    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
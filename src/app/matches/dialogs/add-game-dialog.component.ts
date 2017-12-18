import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { CreateGameModel } from '../../models/create-game-model';
import { IMatchMetadata, IButtonConfiguration, ICodingButtonSet } from '../../typings/model-metadata';
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
    propertiesFormGroup: FormGroup;
    buttonsFormGroup: FormGroup;
    videoFormGroup: FormGroup;
    public videoTypes = ['video/mp4']
    public buttonSets: ICodingButtonSet[];
        
    constructor(private _fb: FormBuilder, 
                public dialogRef: MatDialogRef<AddGameDialog>,
                public matchService: MatchService, 
                private buttonService: ButtonService,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {

        this.propertiesFormGroup = this._fb.group({
            competitionName: ['', Validators.required],
            matchName: ['', Validators.required],
            roundNumber: [''],
            matchDate: ['', Validators.required],
            homeTeam: ['', Validators.required],
            awayTeam: ['', Validators.required],
            venue: ['']
        });

        this.buttonsFormGroup = this._fb.group({
            buttonSetId: null,
        })

        this.propertiesFormGroup.controls.matchDate.setValue(new Date());

        this.videoFormGroup = this._fb.group({
            src: ['https://codingtoolproto.blob.core.windows.net/asset-ba8ecd34-d730-4966-9f85-9f4b113b22e7/R9_GRGvAHC_FullGame.mp4?sv=2015-07-08&sr=c&si=baf99b1f-e9f3-456a-aa48-1ed66060be6d&sig=UCEqEhJaE6Uohy%2BxFjrB7vT39XCV60%2FWp%2FSHeBqPbLE%3D&st=2017-12-06T03%3A08%3A54Z&se=2117-12-06T03%3A08%3A54Z'],
            type: ['video/mp4']
        });

        this.buttonService.getButtonSets()
            .subscribe(b => this.buttonSets = b);
    } 

    onSaveClick(): void {
        let match = {
            userId: '',
            properties: this.propertiesFormGroup.value,
            buttonConfiguration: {},
            events: [],
            media: this.videoFormGroup.value,
        } as IMatchMetadata;

        let t = new Date(this.propertiesFormGroup.controls.matchDate.value)
       
        match.properties.matchDate = t.toString()

        this.matchService.addMatch(match)
            .then(() => this.dialogRef.close(match));

    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
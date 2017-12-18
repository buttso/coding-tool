import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { IMatchMetadata, IButtonConfiguration, ICodingButtonSet } from '../../typings/model-metadata';
import { EditGameModel } from '../../models/edit-game-model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatchService } from '../../services/match.service';
import { ButtonService } from '../../services/button.service';


@Component({
    selector: 'edit-game-dialog',
    templateUrl: './edit-game-dialog.html',
    styles: [ ".mat-form-field { display: block }" ]
  })
  export class EditGameDialog implements OnInit {
    
    isLinear = true;
    propertiesFormGroup: FormGroup;
    buttonsFormGroup: FormGroup;
    videoFormGroup: FormGroup;
    public videoTypes = ['video/mp4'];
    public buttonSets: ICodingButtonSet[];
        
    constructor(private _fb: FormBuilder, 
                public dialogRef: MatDialogRef<EditGameDialog>,
                public matchService: MatchService,
                public buttonService: ButtonService,
                @Inject(MAT_DIALOG_DATA) public match: IMatchMetadata) { }

    ngOnInit(): void {

        this.propertiesFormGroup = this._fb.group(this.match.properties);
        if(!this.match.properties.roundNumber) {
            this.propertiesFormGroup.controls.roundNumber = new FormControl();
        }

        this.propertiesFormGroup.controls.matchDate.setValue(new Date(this.match.properties.matchDate));

        let buttonSetId = (this.match.buttonSetId) ? this.match.buttonSetId : null;
        this.buttonsFormGroup = this._fb.group({
            buttonSetId: buttonSetId,
        })

        this.videoFormGroup = this._fb.group(this.match.media);

        this.buttonService.getButtonSets()
            .subscribe(b => this.buttonSets = b);
    }

    onSaveClick(): void {

        this.match.properties = this.propertiesFormGroup.value;
        this.match.media = this.videoFormGroup.value

        let t = new Date(this.propertiesFormGroup.controls.matchDate.value)
        
        this.match.properties.matchDate = t.toString()

        this.match.buttonSetId = this.buttonsFormGroup.controls.buttonSetId.value;
        this.match.buttonConfiguration = null;

        this.matchService.updateMatch(this.match)
            .then(() => this.dialogRef.close(this.match));
    }
  
    onNoClick(): void {
        this.dialogRef.close();
    }
   
  }

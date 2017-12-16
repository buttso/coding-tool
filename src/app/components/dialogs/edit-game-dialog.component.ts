import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { IMatchMetadata, IButtonConfiguration } from '../../typings/model-metadata';
import { EditGameModel } from '../../models/edit-game-model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatchService } from '../../services/match.service';


@Component({
    selector: 'edit-game-dialog',
    templateUrl: './edit-game-dialog.html',
    styles: [ ".mat-form-field { display: block }" ]
  })
  export class EditGameDialog implements OnInit {
    
    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    importedEvents: any;
    public videoTypes = ['video/mp4']
        
    constructor(private _fb: FormBuilder, 
                public dialogRef: MatDialogRef<EditGameDialog>,
                public matchService: MatchService,
                @Inject(MAT_DIALOG_DATA) public match: IMatchMetadata) { }

    ngOnInit(): void {

        this.firstFormGroup = this._fb.group(this.match.properties);
        if(!this.match.properties.roundNumber) {
            this.firstFormGroup.controls.roundNumber = new FormControl();
        }

        this.firstFormGroup.controls.matchDate.setValue(new Date(this.match.properties.matchDate));

        this.secondFormGroup = this._fb.group(this.match.media);
    }

    onSaveClick(): void {

        this.match.properties = this.firstFormGroup.value;
        this.match.media = this.secondFormGroup.value

        let t = new Date(this.firstFormGroup.controls.matchDate.value)
        // console.log(t.toString())

        this.match.properties.matchDate = t.toString()

        if(this.importedEvents !== undefined) {
            let json = JSON.parse(this.importedEvents);
            if(json !== undefined) {
                this.match.events = json.events;
                this.match.buttonConfiguration = json.buttonConfiguration;
            }
        }

        this.matchService.updateMatch(this.match)
            .then(() => this.dialogRef.close(this.match));
    }
  
    onNoClick(): void {
        this.dialogRef.close();
    }
   
  }

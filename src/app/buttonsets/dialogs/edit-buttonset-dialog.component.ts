import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { ICodingButtonSet, IButtonConfiguration } from '../../typings/model-metadata';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ButtonService } from '../../services/button.service';


@Component({
    selector: 'edit-buttonset-dialog',
    templateUrl: './edit-buttonset-dialog.html',
    styles: [ ".mat-form-field { display: block }" ]
  })
  export class EditButtonSetDialog implements OnInit {

    firstFormGroup: FormGroup;
    
    constructor(private _fb: FormBuilder, 
                public dialogRef: MatDialogRef<EditButtonSetDialog>,
                private buttonService: ButtonService,
                @Inject(MAT_DIALOG_DATA) public buttonSet: ICodingButtonSet) { }

    ngOnInit(): void {
      this.firstFormGroup = this._fb.group(this.buttonSet);
    } 

    onSaveClick(): void {
        this.buttonSet = this.firstFormGroup.value;
        
        this.buttonService.updateButtonSet(this.buttonSet)
            .then(() => this.dialogRef.close(this.buttonSet));
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
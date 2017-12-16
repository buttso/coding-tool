import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { ICodingButtonSet, IButtonConfiguration } from '../../typings/model-metadata';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ButtonService } from '../../services/button.service';

@Component({
    selector: 'add-buttonset-dialog',
    templateUrl: './add-buttonset-dialog.html',
    styles: [ ".mat-form-field { display: block }" ]
  })
  export class AddButtonSetDialog implements OnInit {
    
    constructor(private _fb: FormBuilder, 
                public dialogRef: MatDialogRef<AddButtonSetDialog>,
                private buttonService: ButtonService,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {

    } 

    onSaveClick(): void {
        console.info('Create buttonset not implemented');
        this.dialogRef.close();
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
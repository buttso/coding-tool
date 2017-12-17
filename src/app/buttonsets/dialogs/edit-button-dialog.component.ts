import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { ICodingButtonSet, IButtonConfiguration } from '../../typings/model-metadata';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ButtonService } from '../../services/button.service';

@Component({
    selector: 'edit-button-dialog',
    templateUrl: './edit-button-dialog.html',
    styles: [ ".mat-form-field { display: block }" ]
  })
  export class EditButtonDialog implements OnInit {

    isLinear = true;
    firstFormGroup: FormGroup;

    public button: IButtonConfiguration;
    public buttonSet: ICodingButtonSet;
    
    constructor(private _fb: FormBuilder, 
                public dialogRef: MatDialogRef<EditButtonDialog>,
                private buttonService: ButtonService) { }

    ngOnInit(): void {
        this.firstFormGroup = this._fb.group(this.button);
    } 

    onSaveClick(): void {
        let button = this.firstFormGroup.value as IButtonConfiguration;
        let exists = this.buttonSet.buttons.filter(b => b.name == button.name);
        if(exists.length > 0) {
            alert(`A button with the name ${button.name} already exists.  Please use a different name or press Cancel to exit.`)
        }else{
            this.buttonSet.buttons.push(button);
              this.buttonService.addButtonSet(this.buttonSet)
                .then(() => this.dialogRef.close(this.buttonSet));
        }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
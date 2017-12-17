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
    colors = ['Red', 'Orange', 'Green', 'Blue', 'Yellow'];

    public button: IButtonConfiguration;
    public buttonSet: ICodingButtonSet;
    
    constructor(private _fb: FormBuilder, 
                public dialogRef: MatDialogRef<EditButtonDialog>,
                private buttonService: ButtonService) { }

    ngOnInit(): void {
        console.log(this.button)
        this.firstFormGroup = this._fb.group(this.button);
    } 

    onSaveClick(): void {
        let button = this.firstFormGroup.value as IButtonConfiguration;
        let exists = this.buttonSet.buttons.find(b => b.identifier == button.identifier);
        if(!exists) {
            alert(`A button with the name ${button.name} was not found.  Press Cancel to exit.`)
        }else{
            exists.color = button.color;
            exists.leadSeconds = button.leadSeconds;
            exists.lagSeconds = button.lagSeconds;
           
            this.buttonService.updateButtonSet(this.buttonSet)
                .then(() => this.dialogRef.close(this.buttonSet));
        }

        
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    compareFn(item1: string, item2: string): boolean {
        return (item1 && item2) && item1.toLowerCase() === item2.toLowerCase();
      }
  }
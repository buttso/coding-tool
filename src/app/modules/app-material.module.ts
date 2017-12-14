import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatIconModule, 
  MatInputModule, 
  MatMenuModule, 
  MatTooltipModule, 
  MatToolbarModule, 
  MatButtonModule, 
  MatGridListModule,
  MatSidenavModule, 
  MatCheckboxModule, 
  MatDialogModule, 
  MatSelectModule, 
  MatDatepickerModule, 
  MatFormFieldModule, 
  MatNativeDateModule, 
  MatAutocompleteModule, 
  MatCardModule, 
  MatProgressBarModule,
  MatStepperModule} from '@angular/material';

  import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,  
    MatMenuModule,
    MatNativeDateModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  declarations: []
})
export class AppMaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatIconModule, 
  MatInputModule, 
  MatMenuModule, 
  MatTooltipModule, 
  MatToolbarModule, 
  MatButtonModule, 
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
    MatIconModule,
    MatInputModule,  
    MatMenuModule,
    MatNativeDateModule,
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
    MatInputModule,
    MatIconModule,
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

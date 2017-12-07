import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatInputModule, MatMenuModule, MatTooltipModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatCheckboxModule, MatDialogModule, MatSelectModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatAutocompleteModule, MatCardModule } from '@angular/material';

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
    MatSelectModule,
    MatSidenavModule,
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
    MatSelectModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  declarations: []
})
export class AppMaterialModule { }

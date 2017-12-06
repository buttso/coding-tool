import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatInputModule, MatMenuModule, MatTooltipModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatCheckboxModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,    
    MatMenuModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  declarations: []
})
export class AppMaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatInputModule, MatMenuModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,    
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  declarations: []
})
export class AppMaterialModule { }

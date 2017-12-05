import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,    
    MatTooltipModule
  ],
  exports: [
    MatInputModule,
    MatTooltipModule
  ],
  declarations: []
})
export class AppMaterialModule { }

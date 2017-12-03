import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,    
  ],
  exports: [
    MatInputModule
  ],
  declarations: []
})
export class AppMaterialModule { }

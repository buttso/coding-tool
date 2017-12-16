import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../modules/app-material.module';
import { FirebaseModule } from '../modules/firebase.module';
import { ContextMenuModule } from 'ngx-contextmenu';
import { ServicesModule } from '../services/services.module';
import { VideoPlayerModule } from '../modules/video-player.module';
import { CoreComponentsModule } from '../core-components/core-components.module';

import { ButtonSetEditorComponent } from './buttonset-editor/buttonset-editor.component';
// import { ButtonSetListComponent } from './buttonset-list/buttonset-list.component';
// import { AddButtonSetDialog } from './dialogs/add-buttonset-dialog.component';
// import { EditButtonSetDialog } from './dialogs/edit-buttonset-dialog.component';

import { Routes, Router, RouterModule } from '@angular/router';
import { AddButtonSetDialog } from './dialogs/add-buttonset-dialog.component';
import { EditButtonSetDialog } from './dialogs/edit-buttonset-dialog.component';



const routes: Routes = [
  { path: 'buttons', component: ButtonSetEditorComponent }
];

@NgModule({
    declarations: [
      ButtonSetEditorComponent,
      AddButtonSetDialog,
      EditButtonSetDialog
    ],
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      RouterModule.forChild(routes),
      AppMaterialModule,
      FirebaseModule,
      ContextMenuModule,
      VideoPlayerModule, 
      ServicesModule,
      CoreComponentsModule 
    ],
    providers: [],
    entryComponents: [
      AddButtonSetDialog,
      EditButtonSetDialog
    ]
  })
  export class ButtonSetsModule { }
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

import { AddGameDialog } from './dialogs/add-game-dialog.component';
import { EditGameDialog } from './dialogs/edit-game-dialog.component';
import { ImportEventsDialog } from './dialogs/import-events-dialog.component';
import { CodeToolHostComponent } from './code-tool-host/code-tool-host.component';
import { CodingButtonPanelComponent } from './coding-button-panel/coding-button-panel.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';


const routes: Routes = [
  { path: 'list', component: MatchListComponent },
  { path: 'editor/:id', component: CodeToolHostComponent }
];

@NgModule({
    declarations: [
      MatchListComponent,
      CodeToolHostComponent,
      CodingButtonPanelComponent,
      AddGameDialog,
      EditGameDialog,
      ImportEventsDialog
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
      AddGameDialog,
      EditGameDialog,
      ImportEventsDialog
    ]
  })
  export class MatchModule { }
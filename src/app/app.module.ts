import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AppMaterialModule } from './modules/app-material.module';
import { ContextMenuModule } from 'ngx-contextmenu';
import { FirebaseModule } from './modules/firebase.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { ServicesModule } from './modules/services.module';
import { VideoPlayerModule } from './modules/video-player.module';

import { AppComponent } from './app.component';
import { CodeToolHostComponent } from './components/code-tool-host/code-tool-host.component';
import { CodeButtonsComponent } from './components/code-buttons/code-buttons.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MediaPlayerControlsComponent } from './components/media-player-controls/media-player-controls.component';
import { TimerProgressComponent } from './components/timer-progress/timer-progress.component';
import { AzureMediaPlayerComponent } from './components/azure-media-player/azure-media-player.component';
import { MatchListComponent } from './components/match-list/match-list.component'
import { AddGameDialog } from './components/dialogs/add-game-dialog.component';
import { EditGameDialog } from './components/dialogs/edit-game-dialog.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { PublicHostComponent } from './components/public-host/public-host.component';
import { ButtonListComponent } from './components/button-list/button-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CodeToolHostComponent,
    AzureMediaPlayerComponent,
    CodeButtonsComponent,
    TimelineComponent,
    MediaPlayerControlsComponent, 
    TimerProgressComponent,
    MatchListComponent,
    ButtonListComponent,
    AddGameDialog,
    EditGameDialog,
    VideoPlayerComponent,
    PublicHostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    FirebaseModule,
    ContextMenuModule,
    ServicesModule,
    VideoPlayerModule
  ],
  providers: [],
  entryComponents: [
    AddGameDialog,
    EditGameDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { CodeToolHostComponent } from './components/code-tool-host/code-tool-host.component';
import { CodeButtonsComponent } from './components/code-buttons/code-buttons.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MediaPlayerControlsComponent } from './components/media-player-controls/media-player-controls.component';
import { TimerProgressComponent } from './components/timer-progress/timer-progress.component';
import { TimerService } from './services/timer.service';
import { AzureMediaPlayerComponent } from './components/azure-media-player/azure-media-player.component';
import { JsonDataService } from './services/json-data.service';
import { MatchService } from './services/match.service';
import { TimelineEventService } from './services/timeline-event.service';
import { AppMaterialModule } from './modules/app-material.module';
import { ContextMenuModule } from 'ngx-contextmenu';
import { MatchListComponent } from './components/match-list/match-list.component'
import { AppRoutingModule } from './modules/app-routing.module';
import { AddGameDialog } from './components/dialogs/add-game-dialog.component';
import { EditGameDialog } from './components/dialogs/edit-game-dialog.component';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2/angularfire2';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { VideoPlayerModule } from './modules/video-player.module';
import { PublicHostComponent } from './components/public-host/public-host.component';


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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AppMaterialModule,
    VideoPlayerModule,
    ContextMenuModule
  ],
  providers: [
    JsonDataService, 
    MatchService,
    TimelineEventService, 
    TimerService,
    AuthService
  ],
  entryComponents: [
    AddGameDialog,
    EditGameDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

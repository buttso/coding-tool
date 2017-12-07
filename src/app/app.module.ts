import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { CodeToolHostComponent } from './components/code-tool-host/code-tool-host.component';
import { CodeButtonsComponent } from './components/code-buttons/code-buttons.component';
import { TimelineComponent, TimelineComponent2 } from './components/timeline/timeline.component';
import { MediaPlayerControlsComponent } from './components/media-player-controls/media-player-controls.component';
import { TimerProgressComponent } from './components/timer-progress/timer-progress.component';
import { TimerService } from './services/timer.service';
import { AzureMediaPlayerComponent } from './components/azure-media-player/azure-media-player.component';
import { JsonDataService } from './services/json-data.service';
import { MatchDataService } from './services/match-data.service';
import { TimelineEventService } from './services/timeline-event.service';
import { AppMaterialModule } from './modules/app-material.module';
import { ContextMenuModule } from 'ngx-contextmenu';
import { HomeComponent } from './components/home/home.component'
import { AppRoutingModule } from './modules/app-routing.module';
import { AddGameDialog } from './components/code-tool-host/add-game-dialog.component';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    CodeToolHostComponent,
    AzureMediaPlayerComponent,
    CodeButtonsComponent,
    TimelineComponent,
    TimelineComponent2,
    MediaPlayerControlsComponent, 
    TimerProgressComponent,
    HomeComponent,
    AddGameDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AppMaterialModule,
    ContextMenuModule
  ],
  providers: [
    JsonDataService, 
    MatchDataService,
    TimelineEventService, 
    TimerService,
    AuthService
  ],
  entryComponents: [
    AddGameDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

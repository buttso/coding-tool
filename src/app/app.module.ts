import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    AppComponent,
    CodeToolHostComponent,
    AzureMediaPlayerComponent,
    CodeButtonsComponent,
    TimelineComponent,
    TimelineComponent2,
    MediaPlayerControlsComponent,
    TimerProgressComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [
    JsonDataService, 
    MatchDataService,
    TimelineEventService, 
    TimerService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

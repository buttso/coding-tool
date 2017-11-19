import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CodeToolHostComponent } from './components/code-tool-host/code-tool-host.component';
import { CodeButtonsComponent } from './components/code-buttons/code-buttons.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MediaPlayerControlsComponent } from './components/media-player-controls/media-player-controls.component';
import { TimerProgressComponent } from './components/timer-progress/timer-progress.component';
import { TimerService } from './services/timer.service';
import { AzureMediaPlayerComponent } from './components/azure-media-player/azure-media-player.component';


@NgModule({
  declarations: [
    AppComponent,
    CodeToolHostComponent,
    AzureMediaPlayerComponent,
    CodeButtonsComponent,
    TimelineComponent,
    MediaPlayerControlsComponent,
    TimerProgressComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

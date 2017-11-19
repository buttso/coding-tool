import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CodeToolComponent } from './components/code-tool/code-tool.component';
import { MediaPresenterComponent } from './components/media-presenter/media-presenter.component';
import { CodeButtonsComponent } from './components/code-buttons/code-buttons.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TimerControlsComponent } from './components/timer-controls/timer-controls.component';
import { TimerProgressComponent } from './components/timer-progress/timer-progress.component';
import { TimerService } from './services/timer.service';


@NgModule({
  declarations: [
    AppComponent,
    CodeToolComponent,
    MediaPresenterComponent,
    CodeButtonsComponent,
    TimelineComponent,
    TimerControlsComponent,
    TimerProgressComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

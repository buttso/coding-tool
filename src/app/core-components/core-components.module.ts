import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../modules/app-material.module';
import { FirebaseModule } from '../modules/firebase.module';
import { ContextMenuModule } from 'ngx-contextmenu';
import { ServicesModule } from '../services/services.module';
import { VideoPlayerModule } from '../modules/video-player.module';

import { AzureMediaPlayerComponent } from './azure-media-player/azure-media-player.component';
import { TimelineComponent } from './timeline/timeline.component';
import { VideoPlayerComponent } from './video-player/video-player.component';


@NgModule({
    declarations: [
      AzureMediaPlayerComponent,
      TimelineComponent,
      VideoPlayerComponent
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppMaterialModule,
      FirebaseModule,
      ContextMenuModule,
      VideoPlayerModule,
      ServicesModule
    ],
    exports: [
      AzureMediaPlayerComponent,
      TimelineComponent,
      VideoPlayerComponent
    ],
    providers: [],
    entryComponents: []
  })
  export class CoreComponentsModule { }
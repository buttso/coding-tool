import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AppMaterialModule } from './modules/app-material.module';
import { ContextMenuModule } from 'ngx-contextmenu';
import { FirebaseModule } from './modules/firebase.module';
import { ServicesModule } from './services/services.module';
import { VideoPlayerModule } from './modules/video-player.module';

import { CoreComponentsModule } from './core-components/core-components.module';
import { MatchModule } from './matches/match.module';

import { AppComponent } from './app.component';
import { PublicHostComponent } from './components/public-host/public-host.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { ButtonSetsModule } from './buttonsets/buttonset.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicHostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FirebaseModule,
    ContextMenuModule,
    ServicesModule,
    VideoPlayerModule,
    CoreComponentsModule,    
    MatchModule,
    ButtonSetsModule,
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

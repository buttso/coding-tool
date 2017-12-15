import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ButtonService } from '../services/button.service';
import { JsonDataService } from '../services/json-data.service';
import { MatchEventService } from '../services/match-event.service';
import { MatchService } from '../services/match.service';
import { TimerService } from '../services/timer.service';
import { MatchParserService } from '../services/match-parser.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    ButtonService,
    JsonDataService,
    MatchEventService,
    MatchParserService,
    MatchService,
    TimerService
  ],
  declarations: []
})
export class ServicesModule { }

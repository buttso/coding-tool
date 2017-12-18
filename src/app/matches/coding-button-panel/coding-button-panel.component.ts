import { Component, Input, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { CodeToolHostComponent } from '../code-tool-host/code-tool-host.component';
import { ICodeButtonPanel, ICodingEvent } from '../../typings/domain';
import { IButtonConfiguration, ICodingButtonSet } from '../../typings/model-metadata';
import { MatchEventService } from '../../services/match-event.service';
import { ButtonService } from '../../services/button.service';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'coding-button-panel',
  templateUrl: './coding-button-panel.component.html',
  styleUrls: ['./coding-button-panel.component.css']
})
export class CodingButtonPanelComponent implements ICodeButtonPanel, OnInit {
  
  @Input() buttonSetId: string;
  buttonSet: ICodingButtonSet;
  
  constructor(
    private timerService: TimerService, 
    private matchEventService: MatchEventService,
    private buttonService: ButtonService,
    private authService: AuthService) { }

  ngOnInit(): void {
    let hasButtonKey = this.buttonSetId !== undefined && this.buttonSetId !== null;
   

    if(hasButtonKey) {

      console.log(`fetching buttons for buttonSet ${this.buttonSetId}`)
      this.authService.user$.subscribe(auth => {
        console.info(`Button panel::auth callback`)
        if(auth != null) {
          this.buttonService.getButtonSet(this.buttonSetId, auth.uid)
            .subscribe(buttonSet => {
              console.info(buttonSet) 
              this.buttonSet = buttonSet;
            });
        }
      });
      
      
    }
  }

  onButtonClick(button: IButtonConfiguration) {
      let time = this.timerService.getTime();
      let codingEvent = {
        time: time,
        eventType: button.eventType,
        color: button.color,
        leadSeconds: button.leadSeconds,
        lagSeconds: button.lagSeconds
      } as ICodingEvent;

      this.matchEventService.addCodingEvent(codingEvent);
  }


  getDefaultButtons(): IButtonConfiguration[] {
    return [
      { name: "Press", eventType: "Press", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { name: "Outlet", eventType: "Outlet", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { name: "Circle Entry For", eventType: "Circle Entry For", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { name: "Circle Entry Ag.", eventType: "Circle Entry Ag.", type: {name: ''}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { name: "Goal Shot Ag.", eventType: "Goal Shot Ag.", type: {name: ''}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { name: "Goal Shot For.", eventType: "Goal Shot For.", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { name: "Goal For", eventType: "Goal For", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { name: "Goal Ag.", eventType: "Goal Ag.", type: {name: ''}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { name: "APC", eventType: "APC", type: {name: ''}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { name: "DPC", eventType: "DPC", type: {name: ''}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { name: "Special", eventType: "Special", type: {name: ''}, color: "red", lagSeconds: 5, leadSeconds: 5 },
    ] as IButtonConfiguration[];
  }

}

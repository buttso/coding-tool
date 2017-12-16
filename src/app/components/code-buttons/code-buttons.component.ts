import { Component, Input, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { CodeToolHostComponent } from '../code-tool-host/code-tool-host.component';
import { IButtonConfiguration, ICodeButtonPanel, ICodingEvent, ICodingButtonSet } from '../../typings/domain';
import { MatchEventService } from '../../services/match-event.service';

@Component({
  selector: 'code-buttons',
  templateUrl: './code-buttons.component.html',
  styleUrls: ['./code-buttons.component.css']
})
export class CodeButtonsComponent implements ICodeButtonPanel, OnInit {
  
  @Input() buttons: IButtonConfiguration[];
  
  constructor(private timerService: TimerService, private matchEventService: MatchEventService) { }

  ngOnInit(): void {
    let hasButtons = this.buttons !== undefined && this.buttons !== null && this.buttons.length > 0;

    this.buttons = (hasButtons) ? this.buttons : this.getDefaultButtons();
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

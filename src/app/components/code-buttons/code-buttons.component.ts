import { Component, Input, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { CodeToolHostComponent } from '../code-tool-host/code-tool-host.component';
import { IButtonConfiguration, ICodeButtonPanel, ICodingEvent } from '../../typings/domain';
import { TimelineEventService } from '../../services/timeline-event.service';

@Component({
  selector: 'code-buttons',
  templateUrl: './code-buttons.component.html',
  styleUrls: ['./code-buttons.component.css']
})
export class CodeButtonsComponent implements ICodeButtonPanel, OnInit {
  
  @Input() buttons: IButtonConfiguration[];
  
  constructor(private timerService: TimerService, private timelineEventService: TimelineEventService) { }

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

      this.timelineEventService.addCodingEvent(codingEvent);
  }


  getDefaultButtons(): IButtonConfiguration[] {
    return [
      { eventType: "Press", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Outlet", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Circle Entry For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Circle Entry Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Goal Shot Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Goal Shot For.", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Goal For", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Goal Ag.", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "APC", color: "blue", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "DPC", color: "yellow", lagSeconds: 5, leadSeconds: 5 },
      { eventType: "Special", color: "red", lagSeconds: 5, leadSeconds: 5 },
    ];
  }

}

import { Component, Input } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { CodeToolHostComponent } from '../code-tool-host/code-tool-host.component';
import { IButtonConfiguration, ICodeButtonPanel, ICodingEvent } from '../../typings/domain';
import { TimelineEventService } from '../../services/timeline-event.service';

@Component({
  selector: 'code-buttons',
  templateUrl: './code-buttons.component.html',
  styles: ['./code-buttons.component.css']
})
export class CodeButtonsComponent implements ICodeButtonPanel {
  
  @Input() buttons: IButtonConfiguration[];
  
  constructor(private timerService: TimerService, private timelineEventService: TimelineEventService) { }

  onButtonClick(button: IButtonConfiguration) {
      let time = this.timerService.getTime();
      let codingEvent = {
        time: time,
        eventType: button.eventType,
        color: button.color
      } as ICodingEvent;

      this.timelineEventService.addCodingEvent(codingEvent);
  }

}

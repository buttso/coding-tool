import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { CodeToolHostComponent } from '../code-tool-host/code-tool-host.component';
import { IButtonConfiguration, ICodeButtonPanel, ICodingEvent } from '../../../../typings/domain';

@Component({
  selector: 'code-buttons',
  templateUrl: './code-buttons.component.html',
  styles: []
})
export class CodeButtonsComponent implements ICodeButtonPanel {
  
  @Output() oncodeevent = new EventEmitter<ICodingEvent>();
  @Input() buttons: IButtonConfiguration[];
  
  constructor(private timerService: TimerService) { }

  onButtonClick(button: IButtonConfiguration) {
      let time = this.timerService.getTime();
      console.info(`Adding event for ${button.eventType} (${time})`);

      this.oncodeevent.emit({
        time: time,
        eventType: button.eventType,
        color: button.color
      });
  }

}

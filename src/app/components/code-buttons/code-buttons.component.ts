import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'code-buttons',
  templateUrl: './code-buttons.component.html',
  styles: []
})
export class CodeButtonsComponent implements OnInit {

  constructor(private timerService: TimerService) { }

  ngOnInit() {
  }

  onButtonClick(buttonType: string, eventColor: string) {
      let ticks = this.timerService.GetTicks();
      console.info(`${buttonType} -- ${ticks}`);

      this.timerService.AddEvent({
          ticks: ticks,
          eventType: buttonType,
          eventColor: eventColor
      });
  }

}

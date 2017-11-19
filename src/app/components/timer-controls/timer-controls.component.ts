import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'timer-controls',
  templateUrl: './timer-controls.component.html',
  styles: []
})
export class TimerControlsComponent implements OnInit {

  private playPauseStopUnsubscribe: any;
  private play: boolean;

  constructor(private timerService: TimerService) {
  }

  ngOnInit() {
      this.playPauseStopUnsubscribe = this.timerService.playPauseStop$.subscribe((res: any) => this.setPlay(res));
  }

  ngOnDestroy() {
      this.playPauseStopUnsubscribe.unsubscribe();
  }

  private setPlay(res: any) {
      (res.play) ? this.play = true : this.play = false;
  }

  playTimer() {
      this.timerService.playTimer();
  }

  pauseTimer() {
      this.timerService.pauseTimer();
  }

  stopTimer() {
      this.timerService.stopTimer();
  }

}

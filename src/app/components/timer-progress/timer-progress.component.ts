import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { TimerService } from '../../services/timer.service';

@Component({
    selector: 'timer-progress',
    template: ` 
        <h1>{{formattedTime()}}</h1>
    `,
    styles: [`
        h1 {
            color: #57acec;
            margin-top: 24px; 
            text-align: center;   
        }    
    `]
})
export class TimerProgressComponent implements OnInit, OnDestroy {
    private playPauseStopUnsubscribe: any;

    start = 0;
    ticks = 0;

    minutesDisplay: number = 0;
    hoursDisplay: number = 0;
    secondsDisplay: number = 0;

    sub: Subscription;

    constructor(private timerService: TimerService) {
    }

    ngOnInit() {
        this.playPauseStopUnsubscribe = this.timerService.playPauseStop$.subscribe((res: any) => this.playPauseStop(res));
    }

    ngOnDestroy() {
        this.playPauseStopUnsubscribe.unsubscribe();;
    }

    private playPauseStop(res: any) {
        if (res.play) {
            this.startTimer();
        } else if (res.pause) {
            this.pauseTimer();
        } else if (res.stop) {
            this.stopTimer();
        }
    }

    private startTimer() {

        let timer = Observable.timer(1, 1000);
        this.sub = timer.subscribe(
            t => {
                this.ticks = this.start + t;

                this.secondsDisplay = this.getSeconds(this.ticks);
                this.minutesDisplay = this.getMinutes(this.ticks);
                this.hoursDisplay = this.getHours(this.ticks);


                this.timerService.SetTicks(this.ticks);
                this.timerService.SetFormattedTime(this.formattedTime());
            }
        );
    }

    private pauseTimer() {
        this.start = ++this.ticks;
        if (this.sub) this.sub.unsubscribe();
    }

    private stopTimer() {
        this.start = 0;
        this.ticks = 0;

        this.minutesDisplay = 0;
        this.hoursDisplay = 0;
        this.secondsDisplay = 0;
        if (this.sub) this.sub.unsubscribe();
    }

    private getSeconds(ticks: number) {
        return this.pad(ticks % 60);
    }

    private getMinutes(ticks: number) {
        return this.pad((Math.floor(ticks / 60)) % 60);
    }

    private getHours(ticks: number) {
        return this.pad(Math.floor((ticks / 60) / 60));
    }

    private pad(digit: any) {
        return digit <= 9 ? '0' + digit : digit;
    }

    private formattedTime(): string {
        let hours = this.hoursDisplay ? this.hoursDisplay : '00';
        let minutes = (this.minutesDisplay) && (this.minutesDisplay <= 59) ? this.minutesDisplay : '00';
        let seconds = (this.secondsDisplay) && (this.secondsDisplay <= 59) ? this.secondsDisplay : '00';

        let formatStr = `${hours}:${minutes}:${seconds}`;
        return formatStr;
    }
}
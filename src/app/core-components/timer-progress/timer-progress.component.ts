import { Component } from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
    selector: 'timer-progress',
    templateUrl: './timer-progress.component.html',
    styles: [`
        h1 {
            color: #57acec;
            margin-top: 24px; 
            text-align: center;   
        }    
    `]
})
export class TimerProgressComponent {
    
    start = 0;
    currentTime = 0;

    minutesDisplay: number = 0;
    hoursDisplay: number = 0;
    secondsDisplay: number = 0;

    constructor(private timerService: TimerService) {
    }

    timerChanged(args: any) {
        this.currentTime = args.currentTime;

        this.secondsDisplay = this.getSeconds(this.currentTime);
        this.minutesDisplay = this.getMinutes(this.currentTime);
        this.hoursDisplay = this.getHours(this.currentTime);
    }

    getSeconds(ticks: number) {
        return this.pad(ticks % 60);
    }

    getMinutes(ticks: number) {
        return this.pad((Math.floor(ticks / 60)) % 60);
    }

    getHours(ticks: number) {
        return this.pad(Math.floor((ticks / 60) / 60));
    }

    pad(digit: any) {
        return digit <= 9 ? '0' + digit : digit;
    }

    formattedTime(): string {
        let hours = this.hoursDisplay ? this.hoursDisplay : '00';
        let minutes = (this.minutesDisplay) && (this.minutesDisplay <= 59) ? this.minutesDisplay : '00';
        let seconds = (this.secondsDisplay) && (this.secondsDisplay <= 59) ? this.secondsDisplay : '00';

        let formatStr = `${hours}:${minutes}:${seconds}`;
        return formatStr;
    }
}
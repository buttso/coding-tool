// https://dmkcode.com/2016/09/simple-timer-using-angular-2-and-rxjs-part-2/

import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TimerService {

    private play: boolean = false;
    private pause: boolean = false;
    private stop: boolean = true;
    public playPauseStop$ = new EventEmitter();
    public CodeEvent$ = new EventEmitter(); // TODO: strong typed event args

    public playTimer() {
        this.play = true;
        this.pause = false;
        this.stop = false;

        this.playPauseStop$.emit({
            play: this.play
        });
    }

    public pauseTimer() {
        this.play = false;
        this.pause = true;
        this.stop = false;

        this.playPauseStop$.emit({
            pause: this.pause
        });
    }

    public stopTimer() {
        this.play = false;
        this.pause = false;
        this.stop = true;

        this.playPauseStop$.emit({
            stop: this.stop
        });
    }

    private _ticks = 0;
    public GetTicks(): number {
        return this._ticks;
    }
    public SetTicks(ticks: number) {
        this._ticks = ticks;
    }

    private _formattedTime = '';
    public GetFormattedTime(): string {
        return this._formattedTime;
    }
    public SetFormattedTime(formattedTime: string) {
        this._formattedTime = formattedTime;
    }


    public AddEvent(args: any) {
        this.CodeEvent$.emit(args);
    }

}
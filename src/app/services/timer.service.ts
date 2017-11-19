// https://dmkcode.com/2016/09/simple-timer-using-angular-2-and-rxjs-part-2/

import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TimerService {

    private currentTime = 0;
    private formattedTime = '';
    public onchange = new EventEmitter(); // TODO: strong typed event args

    
    public getTime(): number {
        return this.currentTime;
    }
    public setTime(time: number) {
        this.currentTime = time;
        this.onChange({currentTime: time});
    }

    public onChange(args: any) {
        this.onchange.emit(args);
    }
}

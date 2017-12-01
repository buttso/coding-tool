import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TimerService {

    private currentTime = 0;
    private formattedTime = '';
    
    // Observable source
    public onTimeChange = new Subject<any>();
    

    
    public getTime(): number {
        return this.currentTime;
    }
    public setTime(time: number) {
        this.currentTime = time;
        this.onChange({currentTime: time});
    }

    public onChange(args: any) {
        this.onTimeChange.next(args);
    }
}

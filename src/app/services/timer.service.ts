import { Subject } from 'rxjs';

export class TimerService {

    private currentTime = 0;
    private formattedTime = '';
    
    // Observable source
    public onTimeChange = new Subject<number>();
    
    public getTime(): number {
        return this.currentTime;
    }
    public setTime(time: number) {
        this.currentTime = time;
        this.onChange(time);
    }

    public onChange(currentTime: number) {
        this.onTimeChange.next(currentTime);
    }
}

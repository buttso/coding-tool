import { Component } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { ICodeEventTimeline, ICodingEvent } from '../../../../typings/domain';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styles: []
})
export class TimelineComponent implements ICodeEventTimeline {

    list = new Array<any>();

    public constructor(private timerService: TimerService) { }

    addCodingEvent(codingEvent: ICodingEvent): void {
        let item = this.list.find(e => e.eventType === codingEvent.eventType);
        let obj = { seconds: codingEvent.time, color: codingEvent.color, classString: `label label-${codingEvent.color}` };

        if (item === null || item === undefined) {
            this.list.push({
                eventType: codingEvent.eventType,
                items: [obj]
            })
        }
        else {
            item.items.push(obj);
        }

        this.list = this.list.sort((a, b) => {
            if (a.eventType < b.eventType) {
                return -1;
            }
            if (a.eventType > b.eventType) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    }


    getLeftPixels(item: any): number {
        let containerWidth = 800;
        let val = containerWidth * this.getLeftPercent(item.seconds);
        console.info(val);
        return val;
    }

    public getLeftPercent(elapsed: number): number {
        let maximumSeconds = 60 * 70;
        return elapsed / maximumSeconds;
    }

}

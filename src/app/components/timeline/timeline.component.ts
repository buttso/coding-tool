import { Component } from '@angular/core';
import { ICodeEventTimeline, ICodingEvent } from '../../typings/domain';
import { TimelineEventService } from '../../services/timeline-event.service';


@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styles: ['./timeline.component.css']
})
export class TimelineComponent implements ICodeEventTimeline {
  
    list = []; 
    listLength = 0;
    videoDuration = 60 * 60; // 60 minutes in seconds
    timerSegments = 12;
    segments: number[]; // = [1,2,3,4,5,6,7,8,9,10,11,12];

    constructor(private timelineEventService: TimelineEventService) {
        this.segments = Array(this.timerSegments).fill(1).map((x,i)=>i + 1);

        this.timelineEventService.eventAdded$.subscribe(
            codingEvent => {
              this.addCodingEvent(codingEvent);
            });
    }


    calculateStyleOffsetFromIndex(index: number): string {
        let totalMinutes = this.videoDuration / 60;
        let minutesPerSegment = totalMinutes / this.segments.length;
        let currentMinutes = minutesPerSegment * index;
        let percentage = currentMinutes / totalMinutes * 100;
        return `${percentage}%`;
    }


    calculateStyleOffsetFromSeconds(seconds: number): string {
        console.info(seconds)
        let percentage = seconds / this.videoDuration * 100;
        return `${percentage}%`;
    }

    calculateTimeInterval(index: number): number {
        let totalMinutes = this.videoDuration / 60;
        let minutesPerSegment = totalMinutes / this.segments.length;
        return minutesPerSegment * index;
    }

    // Called from code-tool-host.  
    // Issue with UI not being updated when coding events are added to the list
    addCodingEvent(codingEvent: ICodingEvent): void {
        let item = this.list.find(e => e.eventType === codingEvent.eventType);
        let obj = { seconds: codingEvent.time, color: codingEvent.color, classString: `timeline-item ${codingEvent.color}` };

        if (item === null || item === undefined) {
            this.list.push({
                eventType: codingEvent.eventType,
                items: [obj]
            })
        }
        else {
            item.items.push(obj);
        }

        this.sortList();
        this.listLength = this.list.length;
    }

    

    private sortList() {
        this.list = this.list.sort((a, b) => {
            if (a.eventType < b.eventType) {
                return -1;
            }

            if (a.eventType > b.eventType) {
                return 1;
            } 

            return 0; // names must be equal
        });
    }

    getLeftPixels(item: any): number {
        let containerWidth = 800;
        let val = containerWidth * this.getLeftPercent(item.seconds);
        console.log(val)
        return val;
    }

    public getLeftPercent(elapsed: number): number {
        let maximumSeconds = 60 * 70;
        return elapsed / maximumSeconds;
    }
}


@Component({
    selector: 'timeline2',
    templateUrl: './timeline.component.1.html',
    styles: ['./timeline.component.1.css']
})
export class TimelineComponent2 extends TimelineComponent implements ICodeEventTimeline {
    
}

import { Component, Input, ViewChild } from '@angular/core';
import { ICodeEventTimeline, ICodingEvent, MediaLoadedEvent } from '../../typings/domain';
import { MatchEventService } from '../../services/match-event.service';
import { ICodedEventType, ICodedEventItem } from '../../typings/model-metadata';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements ICodeEventTimeline {

    @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
    
    @Input() eventItems: ICodedEventType[] = []; 
    intervalMode = 'Minutes'
    listLength = 0;
    videoDuration = 60 * 60; // 60 minutes in seconds
    timerSegments = 12;
    segments: number[]; // = [1,2,3,4,5,6,7,8,9,10,11,12];

    constructor(protected matchEventService: MatchEventService) {
        this.segments = Array(this.timerSegments).fill(1).map((x,i)=>i + 1);

        this.matchEventService.eventAdded$.subscribe(
            codingEvent => {
              this.addCodingEvent(codingEvent);
            });

        this.matchEventService.mediaLoaded$.subscribe(
            (e: MediaLoadedEvent) => {
                this.mediaLoaded(e);
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
        // console.info(seconds)
        let percentage = seconds / this.videoDuration * 100;
        return `${percentage}%`;
    }

    calculateTimeInterval(index: number): number {
        let interval = -1;

        if(this.videoDuration > 300) {
            this.intervalMode = 'Minutes'
            let totalMinutes = this.videoDuration / 60;
            let minutesPerSegment = totalMinutes / this.segments.length;
            interval = minutesPerSegment * index;
        }else{
            let secondsPerSegment = this.videoDuration / this.segments.length;
            interval = secondsPerSegment * index;
            this.intervalMode = 'Seconds'
        }
        
        return Math.round(interval)
    }

    // Called from code-tool-host.  
    // Issue with UI not being updated when coding events are added to the list
    addCodingEvent(codingEvent: ICodingEvent): void {
        let item = this.eventItems.find(e => e.eventType === codingEvent.eventType);

        let seconds = Math.max(codingEvent.time - codingEvent.leadSeconds, 0)

        let obj = { 
            seconds: seconds, 
            color: codingEvent.color, 
            classString: `timeline-item ${codingEvent.color}`
         } as ICodedEventItem;

        if (item === null || item === undefined) {
            this.eventItems.push({
                eventType: codingEvent.eventType,
                events: [obj]
            })
        }
        else {
            item.events.push(obj);
        }

        // this.sortList();
        this.listLength = this.eventItems.length;
    }

    private sortList() {
        this.eventItems = this.eventItems.sort((a, b) => {
            if (a.eventType < b.eventType) {
                return -1;
            }

            if (a.eventType > b.eventType) {
                return 1;
            } 

            return 0; // names must be equal
        });
    }

    getLeftPixels(item: ICodedEventItem): number {
        let containerWidth = 800;
        let val = containerWidth * this.getLeftPercent(item.seconds);
        // console.log(val)
        return val;
    }

    getLeftPercent(elapsed: number): number {
        let maximumSeconds = 60 * 70;
        return elapsed / maximumSeconds;
    }

    formatTooltipTime(time: string): string {
        // let t = Math.round(seconds); // moment.duration(seconds).asSeconds();
        let sec_num = parseInt(time, 10); // don't forget the second param

        if(isNaN(sec_num)) {
            return null;
        }

        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        let sHours = (hours < 10) ? "0"+hours : hours.toString();
        let sMinutes = (minutes < 10) ? "0"+minutes : minutes.toString();
        let sSeconds = (seconds < 10) ? "0"+seconds : seconds.toString();
        
        return sHours+':'+sMinutes+':'+sSeconds;
    }

    onEventItemClicked(codingEventItem: ICodedEventItem) {
        this.matchEventService.navigateTo(codingEventItem);
    }


    mediaLoaded(e: MediaLoadedEvent) {
        console.info(`[timeline.mediaLoaded] - duration ${e.duration}`)
        this.videoDuration = e.duration;
     }

    onCommentItemClicked(item: ICodedEventItem) {
        alert(`Comment clicked for ${item.color} at ${item.seconds} seconds.`)
    }

    onDeleteItemClicked(item: ICodedEventItem) {
        // this.timelineEventService.navigateTo(codingEventItem);
        alert(`Delete clicked for ${item.color} at ${item.seconds} seconds.`)
    }
}


// @Component({
//     selector: 'timeline2',
//     templateUrl: './timeline.component.1.html',
//     styles: []
// })
// export class TimelineComponent2 extends TimelineComponent implements ICodeEventTimeline {

//     // @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
    
//     constructor(timelineEventService: TimelineEventService){
//         super(timelineEventService);

//         // this.timelineEventService.mediaLoaded$.subscribe(
//         //     (e: MediaLoadedEvent) => {
//         //       this.mediaLoaded(e);
//         //     });
//     }

//     // onEventItemClicked(codingEventItem: ICodedEventItem) {
//     //     this.timelineEventService.navigateTo(codingEventItem);
//     // }


//     // mediaLoaded(e: MediaLoadedEvent) {
//     //     this.videoDuration = e.duration;
//     //  }

//     //  onCommentItemClicked(item: ICodedEventItem) {
//     //      alert(`Comment clicked for ${item.color} at ${item.seconds} seconds.`)
//     //  }

//     //  onDeleteItemClicked(item: ICodedEventItem) {
//     //     // this.timelineEventService.navigateTo(codingEventItem);
//     //     alert(`Delete clicked for ${item.color} at ${item.seconds} seconds.`)
//     // }

     
// }

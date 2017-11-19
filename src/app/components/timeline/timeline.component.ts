import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styles: []
})
export class TimelineComponent implements OnInit {

  private codeEventUnsubscribe: any;
  private list = new Array<any>();

  public constructor(private timerService: TimerService) { }

  ngOnInit() {
      this.codeEventUnsubscribe = this.timerService.CodeEvent$.subscribe((res: any) => this.onCodeEvent(res));
  }

  ngOnDestroy() {
      this.codeEventUnsubscribe.unsubscribe();;
  }

  onCodeEvent(args: any): any {

      let item = this.list.find(e => e.eventType === args.eventType);
      let obj = { ticks: args.ticks, color: args.eventColor, classString: `label label-${args.eventColor}` };

      if (item === null || item === undefined) {
          this.list.push({
              eventType: args.eventType,
              items: [obj]
          })
      }
      else {
          item.items.push(obj);
      }

      this.list = this.list.sort((a,b) => {
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
      return containerWidth * this.getLeftPercent(item.ticks);
  }

  public getLeftPercent(elapsed: number): number
  {
      let maximumSeconds = 60 * 70;
      return elapsed / maximumSeconds;
  }

}

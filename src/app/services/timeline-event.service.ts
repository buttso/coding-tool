// https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { ICodingEvent } from '../typings/domain';
 
@Injectable()
export class TimelineEventService {
 
  // Observable string source
  private eventAddedSource = new Subject<ICodingEvent>();
 
  // Observable string streams
  eventAdded$ = this.eventAddedSource.asObservable();
 
  // Service message commands
  addCodingEvent(codingEvent: ICodingEvent): void {
    this.eventAddedSource.next(codingEvent);
  }
  
}

// https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
// http://amp.azure.net/libs/amp/latest/docs/index.html#release-notes

import { Subject }    from 'rxjs/Subject';
import { ICodingEvent, MediaLoadedEvent } from '../typings/domain';
 
export class TimelineEventService {

  // Observable string source
  private eventAddedSource = new Subject<ICodingEvent>();
  private navigateToSource = new Subject<ICodingEvent>();
  private mediaLoadedSource = new Subject<MediaLoadedEvent>(); 
 
  // Observable string streams
  eventAdded$ = this.eventAddedSource.asObservable();
  navigateTo$ = this.navigateToSource.asObservable();
  mediaLoaded$ = this.mediaLoadedSource.asObservable();
 
  // Service message commands
  addCodingEvent(codingEvent: ICodingEvent): void {
    this.eventAddedSource.next(codingEvent);
  }

  navigateTo(codingEvent: ICodingEvent): void {
    this.navigateToSource.next(codingEvent);
  }
  
  mediaLoaded(e: MediaLoadedEvent) {
    this.mediaLoadedSource.next(e);
  }

}

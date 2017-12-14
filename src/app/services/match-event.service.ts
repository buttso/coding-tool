// https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
// http://amp.azure.net/libs/amp/latest/docs/index.html#release-notes

import { Subject }    from 'rxjs/Subject';
import { ICodingEvent, MediaLoadedEvent } from '../typings/domain';
import { IMatchMetadata, ICodedEventItem } from '../typings/model-metadata';
 
export class MatchEventService {

  // Observable string source
  private eventAddedSource = new Subject<ICodingEvent>();
  private navigateToSource = new Subject<ICodedEventItem>();
  private mediaLoadedSource = new Subject<MediaLoadedEvent>(); 
  private matchChangedSource = new Subject<IMatchMetadata>(); 
 
  // Observable string streams
  eventAdded$ = this.eventAddedSource.asObservable();
  navigateTo$ = this.navigateToSource.asObservable();
  mediaLoaded$ = this.mediaLoadedSource.asObservable();
  matchChanged$ = this.matchChangedSource.asObservable();
 
  // Service message commands
  addCodingEvent(codingEvent: ICodingEvent): void {
    this.eventAddedSource.next(codingEvent);
  }

  navigateTo(codingEvent: ICodedEventItem): void {
    this.navigateToSource.next(codingEvent);
  }
  
  mediaLoaded(e: MediaLoadedEvent) {
    this.mediaLoadedSource.next(e);
  }

  matchChanged(e: IMatchMetadata) {
    this.matchChangedSource.next(e);
  }

}

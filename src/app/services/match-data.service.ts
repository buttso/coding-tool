// https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
// http://amp.azure.net/libs/amp/latest/docs/index.html#release-notes
import { Injectable } from '@angular/core';
import { IMatchMetadata } from '../typings/model-metadata';
import { JsonDataService } from './json-data.service';
 
@Injectable()
export class MatchDataService {
    
    constructor(private jsonDataService: JsonDataService) {
        
    }

    getAllMatches(): IMatchMetadata[] {
        return this.jsonDataService.fetchAll();
    }

    getMatch(identifier: string): IMatchMetadata {
        return this.jsonDataService.findByIdentifier(identifier);
    }
}

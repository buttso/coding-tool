// https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
// http://amp.azure.net/libs/amp/latest/docs/index.html#release-notes
import { Injectable } from '@angular/core';
import { IMatchMetadata } from '../typings/model-metadata';
// import { JsonDataService } from './json-data.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class MatchDataService {
    
    private matchesCollection: AngularFirestoreCollection<IMatchMetadata>;
    matches: Observable<IMatchMetadata[]>;
    currentUser: firebase.User;

    constructor(private db: AngularFirestore, public auth: AngularFireAuth) {

        this.currentUser = auth.auth.currentUser;

        if(this.currentUser == null) {
            this.matches =  Observable.of<IMatchMetadata[]>();
        }else {
            let uid = this.currentUser.uid;
            this.matchesCollection = db.collection<IMatchMetadata>(`${uid}/matches`);
            this.matches = this.matchesCollection.valueChanges();
        }
        
    }

    addMatch(match: IMatchMetadata): void {
        this.matchesCollection.add(match);
    }

    getAllMatches(): Observable<IMatchMetadata[]> {

        if(this.currentUser == null) {
            return Observable.of<IMatchMetadata[]>();
        }

        return this.matches
          .catch(this.errorHandler);
    }

    // getMatch(identifier: string): IMatchMetadata {
    //     if(this.currentUser != null) {
    //         return this.db.doc(`${uid}/matches`)
    //             .catch(this.errorHandler);
    //     }
    // }

    // getMatchForUser(uid: string, identifier: string): IMatchMetadata {
    //     return this.db.object(`${uid}/matches`)
    //         .catch(this.errorHandler);
    // }


    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
      }
}

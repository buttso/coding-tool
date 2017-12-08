// https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
// http://amp.azure.net/libs/amp/latest/docs/index.html#release-notes
import { Injectable } from '@angular/core';
import { IMatchMetadata } from '../typings/model-metadata';
// import { JsonDataService } from './json-data.service';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MatchService {

    private matchesCollection: AngularFirestoreCollection<IMatchMetadata>;
    matches: Observable<IMatchMetadata[]>;
    matchDoc: AngularFirestoreDocument<IMatchMetadata>;


    constructor(private afs: AngularFirestore) {
        this.matchesCollection = this.afs.collection('matches');
        this.matches = this.matchesCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as IMatchMetadata;
                data.$key = a.payload.doc.id;
                return data;
            });
        });
    }

    // addMatch(match: IMatchMetadata): Promise<void> {
    //     this.currentUser = this.auth.auth.currentUser;
    //     let uid = this.currentUser.uid;

    //     // return this.db.collection(`users/${uid}/matches`).doc(match.properties.matchName).set(match)
    //     //     .then(_ => console.log('success'))
    //     //     .catch(error => console.log(error));
    // }

    getMatches() {
        return this.matches;
    }

    getMatch(matchKey: string): Observable<IMatchMetadata> {
        this.matchDoc = this.afs.doc<IMatchMetadata>(`matches/${matchKey}`);
        return this.matchDoc.valueChanges();        
    }


    addMatch(match: IMatchMetadata) {
        this.matchesCollection.add(match);
    }

    deleteMatch(match: IMatchMetadata) {
        this.matchDoc = this.afs.doc(`matches/${match.$key}`);
        this.matchDoc.delete();
    }

    updateMatch(match: IMatchMetadata) {
        this.matchDoc = this.afs.doc(`matches/${match.$key}`);
        this.matchDoc.update(match);
    }

    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }
}

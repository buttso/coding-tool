// https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
// http://amp.azure.net/libs/amp/latest/docs/index.html#release-notes
import { Injectable } from '@angular/core';
import { IMatchMetadata } from '../typings/model-metadata';
// import { JsonDataService } from './json-data.service';
// import {
//     AngularFirestore,
//     AngularFirestoreCollection,
//     AngularFirestoreDocument
// } from 'angularfire2/firestore';
import {  AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import { Subscription } from 'rxjs';

@Injectable()
export class MatchService {

    // private matchesCollection: AngularFirestoreCollection<IMatchMetadata>;
    // matches: Observable<IMatchMetadata[]>;
    // matchDoc: AngularFirestoreDocument<IMatchMetadata>;

    // matches$: Observable<IMatchMetadata>;
    matches$: FirebaseListObservable<IMatchMetadata[]>;
    // company$: FirebaseObjectObservable<IMatchMetadata>;


    constructor(private db: AngularFireDatabase/*private afs: AngularFirestore*/) {
        // this.matchesCollection = this.afs.collection('matches');
        // this.matches = this.matchesCollection.snapshotChanges().map(changes => {
        //     return changes.map(a => {
        //         const data = a.payload.doc.data() as IMatchMetadata;
        //         data.$key = a.payload.doc.id;
        //         return data;
        //     });
        // });

        this.matches$ = this.db.list(`matches`);

        // this.matches$ = this.db.list<IMatchMetadata>(`matches`).snapshotChanges().map(actions => {
        //         return actions.map(action => ({ key: action.key, ...action.payload.val() }));
        //     });
    }

    getMatches() {
        return this.matches$;
        // return this.matches;
    }

    getMatch(matchKey: string): Observable<IMatchMetadata> {
        // this.matchDoc = this.afs.doc<IMatchMetadata>(`matches/${matchKey}`);
        // return this.matchDoc.valueChanges();   
        // return this.db.object(`matches/${matchKey}`);     
        return this.db.object(`matches/${matchKey}`)
            .catch(this.errorHandler);
    }


    addMatch(match: IMatchMetadata) {
        return this.matches$.push(match)
            .then(_ => console.log('match added'))
            .catch(error => console.log(error));
    }

    deleteMatch(match: IMatchMetadata) {
        return this.matches$.remove(match.$key)
            .then(_ => console.log('match deleted'))
            .catch(error => console.log(error));
    }

    updateMatch(match: IMatchMetadata) {
        return this.matches$.update(match.$key, match)
            .then(_ => console.log('match updated'))
            .catch(error => console.log(error));
    }

    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }
}

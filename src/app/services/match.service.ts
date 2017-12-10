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
import { AuthService } from './auth.service';


@Injectable()
export class MatchService {

    // private matchesCollection: AngularFirestoreCollection<IMatchMetadata>;
    // matches: Observable<IMatchMetadata[]>;
    // matchDoc: AngularFirestoreDocument<IMatchMetadata>;

    // matches$: Observable<IMatchMetadata>;
    userMatches$: FirebaseListObservable<IMatchMetadata[]>;
    uid: string = '';
    // company$: FirebaseObjectObservable<IMatchMetadata>;


    constructor(private db: AngularFireDatabase, private authService: AuthService/*private afs: AngularFirestore*/) {
        let user  = this.authService.user$.subscribe(auth => {

            if(auth != null) {
              this.uid = auth.uid;
              this.userMatches$ = this.db.list(`users/${this.uid}/matches`)
            }
        });

        // this.matches$ = this.db.list<IMatchMetadata>(`matches`).snapshotChanges().map(actions => {
        //         return actions.map(action => ({ key: action.key, ...action.payload.val() }));
        //     });
    }

    getMatches() {
        return this.userMatches$;
            
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

        // Get a key for a new Match.
        var newPostKey = firebase.database().ref().child('matches').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates[`matches/${newPostKey}`] = match;
        updates[`users/${this.uid}/matches/${newPostKey}`] = match;

        return firebase.database().ref().update(updates)
                        .then(_ => console.log('match added'))
                        .catch(error => console.log(error));
    }

    deleteMatch(match: IMatchMetadata) {
        return this.userMatches$.remove(match.$key)
            .then(_ => console.log('match deleted'))
            .catch(error => console.log(error));
    }

    updateMatch(match: IMatchMetadata) {
        // return this.matches$.update(match.$key, match)
        //     .then(_ => console.log('match updated'))
        //     .catch(error => console.log(error));

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates[`matches/${match.$key}`] = match;
        updates[`users/${this.uid}/matches/${match.$key}`] = match;

        return firebase.database().ref().update(updates)
                        .then(_ => console.log('match added'))
                        .catch(error => console.log(error));
    }

    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }
}

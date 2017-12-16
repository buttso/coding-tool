// https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
// http://amp.azure.net/libs/amp/latest/docs/index.html#release-notes
import { Injectable } from '@angular/core';
import { IMatchMetadata } from '../typings/model-metadata';
import {  AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';


@Injectable()
export class MatchService {

    userMatches$: FirebaseListObservable<IMatchMetadata[]>;
    uid: string = '';
    
    constructor(private db: AngularFireDatabase, private authService: AuthService/*private afs: AngularFirestore*/) {
        let user  = this.authService.user$.subscribe(auth => {
            if(auth != null) {
              this.uid = auth.uid;
              this.userMatches$ = this.db.list(`users/${this.uid}/matches`)
            }
        });
    }

    getMatches() {
        return this.userMatches$;
    }

    getMatch(matchKey: string): Observable<IMatchMetadata> {
        return this.db.object(`matches/${matchKey}`)
            .catch(this.errorHandler);
    }

    addMatch(match: IMatchMetadata) {

        var newPostKey = firebase.database().ref().child('matches').push().key;

        var updates = {};
        updates[`matches/${newPostKey}`] = match;
        updates[`users/${this.uid}/matches/${newPostKey}`] = match;

        return firebase.database().ref().update(updates)
                .then(_ => {
                    console.log(`[matchService.addMatch] match added`);
                })
                .catch(error => console.log(error));
    }

    deleteMatch(match: IMatchMetadata) {
        return this.userMatches$.remove(match.$key)
            .then(_ => console.log('match deleted'))
            .catch(error => console.log(error));
    }

    updateMatch(match: IMatchMetadata) {
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

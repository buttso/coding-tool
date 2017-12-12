// https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
// http://amp.azure.net/libs/amp/latest/docs/index.html#release-notes
import { Injectable } from '@angular/core';
import {  AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';
import { IButtonConfiguration } from '../typings/domain';


@Injectable()
export class ButtonService {

    userButtons$: FirebaseListObservable<IButtonConfiguration[]>;
    uid: string = '';
    
    constructor(private db: AngularFireDatabase, private authService: AuthService) {
        let user  = this.authService.user$.subscribe(auth => {

            if(auth != null) {
              this.uid = auth.uid;
              this.userButtons$ = this.db.list(`users/${this.uid}/buttons`)
            }
        });
    }

    getButtonConfigurations(): FirebaseListObservable<IButtonConfiguration[]> {
        return this.userButtons$;
    }

    getButtonConfiguration(key: string): Observable<IButtonConfiguration> {
        return this.db.object(`users/${this.uid}/buttons/${key}`)
            .catch(this.errorHandler);
    }


    addButtonConfiguration(buttonConfiguration: IButtonConfiguration) {

        // Get a key for a new Match.
        var newKey = firebase.database().ref().child(`users/${this.uid}/buttons`).push().key;

        var updates = {};
        updates[`users/${this.uid}/buttons/${newKey}`] = buttonConfiguration;
        
        return firebase.database().ref().update(updates)
                .then(_ => {
                    console.log(`[buttonService.addButtonConfiguration] buttonConfiguration added`);
                })
                .catch(error => console.log(error));
    }

    deleteButtonConfiguration(buttonConfiguration: IButtonConfiguration) {
        return this.userButtons$.remove(buttonConfiguration.$key)
            .then(_ => console.log('match deleted'))
            .catch(error => console.log(error));
    }

    updateButtonConfiguration(buttonConfiguration: IButtonConfiguration) {
        var updates = {};
        updates[`users/${this.uid}/buttons/${buttonConfiguration.$key}`] = buttonConfiguration;
        
        return firebase.database().ref().update(updates)
                        .then(_ => console.log('button configuration updated'))
                        .catch(error => console.log(error));
    }

    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }
}

import { Injectable } from '@angular/core';
import {  AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';
import { IButtonConfiguration, ICodingButtonSet } from '../typings/model-metadata';


@Injectable()
export class ButtonService {

    userButtons$: FirebaseListObservable<ICodingButtonSet[]>;
    uid: string = '';
    
    constructor(private db: AngularFireDatabase, private authService: AuthService) {
        let user  = this.authService.user$.subscribe(auth => {
            if(auth != null) {
              this.uid = auth.uid;
              this.userButtons$ = this.db.list(`users/${this.uid}/buttons`)
            }
        });
    }

    assertIdenfitiers(buttons: IButtonConfiguration[]): IButtonConfiguration[] {

        let ticks = new Date().getTime();

        return buttons.map(e => {
            if(!e.identifier) {
                e.identifier = (ticks++).toString();
            }
            return e;
        })
    }

    getButtonSets(): FirebaseListObservable<ICodingButtonSet[]> {
        return this.userButtons$;
    }

    getButtonSet(key: string): Observable<ICodingButtonSet> {
        return this.db.object(`users/${this.uid}/buttons/${key}`)
            .catch(this.errorHandler);
    }


    addButtonSet(buttonSet: ICodingButtonSet) {

        var newKey = firebase.database().ref().child(`users/${this.uid}/buttons`).push().key;

        var updates = {};
        updates[`users/${this.uid}/buttons/${newKey}`] = buttonSet;
        
        return firebase.database().ref().update(updates)
                .then(_ => {
                    console.log(`[buttonService.addButtonSet] buttonSet added`);
                })
                .catch(error => console.log(error));
    }

    deleteButtonSet(buttonSet: ICodingButtonSet) {
        return this.userButtons$.remove(buttonSet.$key)
            .then(_ => console.log('[buttonService.deleteButtonSet] buttonSet deleted'))
            .catch(error => console.log(error));
    }

    updateButtonSet(buttonSet: ICodingButtonSet) {
        var updates = {};
        updates[`users/${this.uid}/buttons/${buttonSet.$key}`] = buttonSet;
        
        return firebase.database().ref().update(updates)
                        .then(_ => console.log('[buttonService.updateButtonSet] buttonSet updated'))
                        .catch(error => console.log(error));
    }

    public getDefaultButtonSet(): ICodingButtonSet {
        return {
            name: 'Default',
            description: '',
            buttons: [
                { name: "Press", identifier: '1', eventType: "Press", type: {name: 'Event'}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { name: "Outlet", identifier: '2', eventType: "Outlet", type: {name: 'Event'}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { name: "Circle Entry For", identifier: '3', eventType: "Circle Entry For", type: {name: 'Event'}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { name: "Circle Entry Ag.", identifier: '4', eventType: "Circle Entry Ag.", type: {name: 'Event'}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { name: "Goal Shot Ag.", identifier: '5', eventType: "Goal Shot Ag.", type: {name: 'Event'}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { name: "Goal Shot For.", identifier: '6', eventType: "Goal Shot For.", type: {name: 'Event'}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { name: "Goal For", identifier: '7', eventType: "Goal For", type: {name: 'Event'}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { name: "Goal Ag.", identifier: '8', eventType: "Goal Ag.", type: {name: 'Event'}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { name: "APC", identifier: '9', eventType: "APC", type: {name: 'Event'}, color: "blue", lagSeconds: 5, leadSeconds: 5 },
                { name: "DPC", identifier: '10', eventType: "DPC", type: {name: 'Event'}, color: "yellow", lagSeconds: 5, leadSeconds: 5 },
                { name: "Special", identifier: '11', eventType: "Special", type: {name: 'Event'}, color: "red", lagSeconds: 5, leadSeconds: 5 },
              ]
        } as ICodingButtonSet;
    }

    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }
}

import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'Code Tool';

  constructor(private db: AngularFirestore) {
    // db.collection('items').valueChanges()
    //   .subscribe(console.log);
  }
}

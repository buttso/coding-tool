import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { IMatchMetadata, ICodedEventType, IButtonConfiguration } from '../../typings/model-metadata';
import { MatchService } from '../../services/match.service';
import { MatchParserService } from '../../services/match-parser.service';


@Component({
    selector: 'import-events-dialog',
    templateUrl: './import-events-dialog.html',
    styles: [ ".mat-form-field { display: block }" ]
  })
  export class ImportEventsDialog implements OnInit {

    @ViewChild('stepper') stepper;
    
    importedEvents: any;
    eventCount: number;
        
    constructor(public dialogRef: MatDialogRef<ImportEventsDialog>,
                public matchService: MatchService,
                private matchParser: MatchParserService,
                @Inject(MAT_DIALOG_DATA) public match: IMatchMetadata) { }

    ngOnInit(): void {

        
    }


    processImportText() {
        // console.log(this.importedEvents)
        if(this.importedEvents !== undefined) {
            let json = this.matchParser.parse(this.importedEvents);
            if(json !== undefined) {
                this.events = json.events;
            }
        }
        this.stepper.selectedIndex = 1;
    }

    events: ICodedEventType[] = [];
    
    onImportClick(): void {

        this.match.events = this.events;
        this.matchService.updateMatch(this.match)
            .then(() => this.dialogRef.close(this.match));
    }
  
    onNoClick(): void {
        this.dialogRef.close();
    }
   
  }

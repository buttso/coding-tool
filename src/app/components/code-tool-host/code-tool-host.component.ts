import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICodeToolHostComponent } from '../../typings/domain';
import { TimerService } from '../../services/timer.service';
import { IMatchMetadata } from '../../typings/model-metadata';
import { MatchDataService } from '../../services/match-data.service';

@Component({
  selector: 'code-tool-host',
  templateUrl: './code-tool-host.component.html',
  styles: [],
  providers: []
})
export class CodeToolHostComponent implements OnInit, OnDestroy, ICodeToolHostComponent {

  private timerChangedHandle: any;
  private currentMatch: IMatchMetadata;

  constructor(private timerService: TimerService, private matchDataService: MatchDataService) { }

  ngOnInit() {
    this.timerChangedHandle = this.timerService.onTimeChange.subscribe((args: any) => this.timerChanged(args));
    this.setCurrentMatch("1");
  }

  ngOnDestroy() {
    this.timerChangedHandle.unsubscribe();
  }

  setCurrentMatch(identifier: string) {
    this.currentMatch = this.matchDataService.getMatch(identifier);
  }

  timerChanged(args: any): void {
    console.log('CodeTool - Timer Change')
  }

}

import { Component, OnInit } from '@angular/core';
import { IMatchMetadata } from '../../typings/model-metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'public-host',
  templateUrl: './public-host.component.html',
  styleUrls: ['./public-host.component.css']
})
export class PublicHostComponent implements OnInit {

  currentMatch: IMatchMetadata;
  matchKey: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private matchService: MatchService, 
              private authService: AuthService) { }

  ngOnInit() {
    this.matchKey = this.activatedRoute.snapshot.params['id'];
    this.getMatch();
  }

  getMatch() {
    console.log(`[host] getting match`)
    this.matchService.getMatch(this.matchKey)
      .subscribe(match => {
        if(match.events == undefined) {
          match.events = [];
        }
        console.log(`[host] match retrieved`);
        console.info(match)
        this.currentMatch = match;
      });
  }


  cloneGame() {
    this.matchService.addMatch(this.currentMatch)
      .then(r => {
        this.router.navigateByUrl('/list');
      });
  }

}

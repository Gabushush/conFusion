import { Component, Inject, OnInit } from '@angular/core';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInOut]' :'true',
    'style': 'display: block'
  },
  animations:[
    flyInOut(), expand()
  ],
})
export class AboutComponent implements OnInit {

  leaders : Leader[];
  errMess: string;

  constructor( private leaderService: LeaderService,
    @Inject('baseURL') public baseURL:any ) { }

  ngOnInit(): void {

    this.leaderService.getLeaders().subscribe((leaders)=>{this.leaders = leaders},
    errMess => this.errMess = <any>errMess);
    console.log(this.leaders)
  }

}

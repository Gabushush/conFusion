import { Injectable } from '@angular/core';

import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    // return Promise.resolve(LEADERS);
    return new Promise(resolve =>{
      setTimeout(()=>resolve(LEADERS),2000)
    })
  }

  getLeader(id : String): Promise<Leader> {
    // return Promise.resolve(LEADERS.filter((Leader) => (Leader.id === id))[0]);
    return new Promise(resolve =>{
      setTimeout(()=>resolve(LEADERS.filter((Leader) => (Leader.id === id))[0]),2000)
    })
  }

  getFeaturedDish(): Promise<Leader>{
   // return Promise.resolve(LEADERS.filter((Leader) => Leader.featured)[0]);
    return new Promise(resolve =>{
      setTimeout(()=>resolve(LEADERS.filter((Leader) => Leader.featured)[0]),2000)
    })
  }
}

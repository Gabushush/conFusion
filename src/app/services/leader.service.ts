import { Injectable } from '@angular/core';

import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id : String): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((Leader) => (Leader.id === id))[0]);
  }

  getFeaturedDish(): Promise<Leader>{
    return Promise.resolve(LEADERS.filter((Leader) => Leader.featured)[0]);
  }
}

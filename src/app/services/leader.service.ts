import { Injectable } from '@angular/core';

import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id : String): Leader {
    return LEADERS.filter((Leader) => (Leader.id === id))[0];
  }

  getFeaturedDish(): Leader{
    return LEADERS.filter((Leader) => Leader.featured)[0];
  }
}

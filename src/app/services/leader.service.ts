import { Injectable } from '@angular/core';

import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { Observable ,of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    // return Promise.resolve(LEADERS);
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id : String): Observable<Leader> {
    // return Promise.resolve(LEADERS.filter((Leader) => (Leader.id === id))[0]);
    return of((LEADERS.filter((Leader) => (Leader.id === id))[0])).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Leader>{
   // return Promise.resolve(LEADERS.filter((Leader) => Leader.featured)[0]);
    return of((LEADERS.filter((Leader) => Leader.featured)[0])).pipe(delay(2000));
  }
}

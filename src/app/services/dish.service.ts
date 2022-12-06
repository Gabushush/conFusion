import { Injectable } from '@angular/core';
import { Dish } from "../shared/dish";
import { DISHES } from '../shared/dishes';
import { Promotion } from '../shared/promotion';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    // return Promise.resolve(DISHES);
    return new Promise(resolve =>{
      //simulate server latency with 2 seconds delay
      setTimeout(()=>resolve(DISHES),2000);
    });
  }

  getDish(id : String): Promise<Dish> {
    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
    return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000);
    });
  }

  getFeaturedDish(): Promise<Dish>{
    // return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES.filter((dish) => dish.featured)[0]),2000);
    })
  }
}

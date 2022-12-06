import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    // return Promise.resolve(PROMOTIONS);
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS),2000)
    })
  }

  getPromotion(id: string): Promise<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),2000)
    })
  }

  getFeaturedPromotion(): Promise<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((promo) => promo.featured)[0]);
    return new Promise(resolve=>{
      setTimeout(()=>resolve(PROMOTIONS.filter((promo) => promo.featured)[0]),2000)
    })
  }
}

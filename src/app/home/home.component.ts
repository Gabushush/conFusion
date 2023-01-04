import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;

  constructor(private dishService: DishService,
    private promotionService: PromotionService, private leaderService: LeaderService,
    @Inject('baseURL') public baseURL: any) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe((dish)=>{this.dish = dish},
    dishErrMess => this.dishErrMess=<any>dishErrMess);
    this.promotionService.getFeaturedPromotion().subscribe((promotion)=>{this.promotion = promotion;});

    this.leaderService.getFeaturedDish().subscribe((leader) => {
      this.leader=leader;
    });
  }

}

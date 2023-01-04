import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  // selectedDish: Dish;

  // onSelect(dish: Dish){
  //   this.selectedDish= dish;
  // }

  constructor(private dishService: DishService,
    @Inject('baseURL') public baseURL:any ) { }

  ngOnInit() {
    this.dishService.getDishes().subscribe((dishes) =>{this.dishes =      
      dishes},
      errMess => this.errMess = <any>errMess);

    console.log(this.dishes)
  }

  // onSelect(dish: Dish){
  //   this.selectedDish=dish;
  // }

}

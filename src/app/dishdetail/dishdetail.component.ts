import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validator, Validators,NgForm } from '@angular/forms';

import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInOut]' :'true',
    'style': 'display: block'
  },
  animations: [
    visibility(),flyInOut(), expand()
  ]
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: String[];
  prev: any;
  next: any;
  stepIndex: number = 0;
  steps: number[] = [0, 1, 2, 3, 4, 5];
  finalValue: any;
  comments= new Comment();
  commentForm: FormGroup;
  commentArr:any=[];
  dishcopy: Dish;
  visibility = 'shown';

  @ViewChild('commForm') commentFormDirective:NgForm;

  formErr:any={
    rating: '',
    comment: '',
    author: '',
  };

  validationMess: any={
    'rating' : {
      'required': 'Rating for dish is required.',
    },
    'comment': {
      'required': 'Comments on dish is required.',
      'minlength': 'Would love descriptive comments!;)'
    },
    'author' : {
      'required': 'Author Name is required.',
      'minlength': 'Author name must be atleast 2 characters long'
    },
  };
  newdate: string;
  submitted: boolean = false;
  errMess: string;


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb:FormBuilder,
    @Inject('baseURL') public baseURL:any) { this.createForm()}

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    this.route.params.pipe(switchMap((params: Params) => {
        this.visibility ='hidden'; 
        return this.dishservice.getDish(params['id']);})).subscribe(dish => {    
          this.dish = dish; 
          this.dishcopy= dish;
          this.setPrevNext(dish.id); 
          this.visibility = 'shown';
        },
        errMess => this.errMess = <any>errMess);
    console.log("in dish detail", this.dish, this.dishIds)
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: ['',[Validators.required, Validators.pattern]],
      comment: ['',[Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.commentForm.valueChanges.subscribe(data =>this.onValueChanged(data));

    this.onValueChanged();
  }
  onValueChanged(data?: any): void {
    if(!this.commentForm){
      return;
     }
     const form = this.commentForm;
     const d = new Date();
    this.newdate = d.toISOString();
     for (const field in this.formErr){
      if(this.formErr.hasOwnProperty(field)){
        //clear previous error messages
        this.formErr[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMess[field];
          for(const key in control.errors){
            if (control.errors.hasOwnProperty(key)){
              this.formErr[field] += messages[key] + ' ';
            };
          }
        }
      }
     } 
  } 

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string){
    const index= this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  onSubComm(){
    this.comments = this.commentForm.value;
    this.comments.date=new Date().toString();
    console.log(this.comments);
    this.dishcopy.comments.push(this.comments);
    this.dishservice.putDish(this.dishcopy).subscribe(dish => {
      this.dish = dish;
      this.dishcopy = dish;
    },errMess => { this.dish =<any> null; this.dishcopy =<any>null; errMess =<any>errMess});
    console.log("Array",this.commentArr);
    this.submitted=true;
    this.commentForm.reset({
    rating: 0,
    comment: '',
    author:'', 
    });
    this.commentFormDirective.resetForm();
  }

  onInputChange($event: any) {
    this.stepIndex = +$event.value;
    this.finalValue = this.steps[this.stepIndex];
  }

}

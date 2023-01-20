import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators,NgForm } from '@angular/forms';
import { expand, flyInOut } from '../animations/app.animation';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]' :'true',
    'style': 'display: block'
  },
  animations:[
    flyInOut(), expand()
  ],
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: any= Feedback ;
  fbcopy : Feedback;
  contactType=ContactType;
  errMess: string;

  @ViewChild('fform') feedbackFormDirective:NgForm;

  formErrors:any={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };

  validationMessages:any = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  isLoading: boolean = true;
  submitted: boolean = false;
  feedbackcopy: any= Feedback;
  isShowingResponse: boolean;

  constructor(private fb:FormBuilder, private fbservice: FeedbackService) { 
    this.createForm();
    this.isLoading = false;
    this.isShowingResponse = false;
   }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges.subscribe(data =>this.onValueChanged(data));

    this.onValueChanged(); //used to reset form validation messages
  }
  onValueChanged(data?: any) {
   if(!this.feedbackForm){
    return;
   }
   const form = this.feedbackForm;
   for (const field in this.formErrors){
    if(this.formErrors.hasOwnProperty(field)){
      //clear previous error messages
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for(const key in control.errors){
          if (control.errors.hasOwnProperty(key)){
            this.formErrors[field] += messages[key] + ' ';
          };
        }
      }
    }
   } 
  }

  onSubmit() {
    this.isLoading = true;
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.fbservice.submitFeedback(this.feedback)
      .subscribe(feedback => {
          this.feedback = feedback;
          console.log(this.feedback);
        } ,
        errmess => {
          this.feedback = null;
          this.feedbackcopy = null;
          this.errMess = <any>errmess;
        } ,
        () => {
          this.isShowingResponse = true;
          setTimeout(() => {
              this.isShowingResponse = false;
              this.isLoading = false;
            } , 5000
          );
        });
	  
    this.feedbackForm.reset({
		firstname: '',
		lastname: '',
		telnum: 0,
		email: '',
		agree: false,
		contacttype: 'None',
		message: ''
	});
	this.feedbackFormDirective.resetForm();
  }
  

}

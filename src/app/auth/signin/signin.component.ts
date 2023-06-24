import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { tap} from 'rxjs/operators';
import { faMagnifyingGlass,faEye} from '@fortawesome/free-solid-svg-icons';


import { User } from "../user.model";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  faEye=faEye
  showPassword: boolean = false;
  constructor(private authService:AuthService){}
  emailError = null
  passError = null
  isLoading=false;
  onSubmit(form:NgForm)
  {
   
  
    this.isLoading=true;
    console.log(form.value)
    this.authService.signinFormSubmit(form.value).subscribe(response=>
      {
        console.log(response)
       
        this.isLoading =false

      },
      error=>
      {
        console.log(error.error)
     
      
        this.isLoading =false
        if(error.error.message ==='Incorrect password')
        {
          this.passError = error.error.message
          this.emailError=null
        }
        else
        {
          this.emailError = error.error.message
          this.passError=null
        }
      })


   
  }

  togglePasswordVisibility()
  {
    this.showPassword = !this.showPassword;
  }
}

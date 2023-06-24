import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { faMagnifyingGlass,faEye} from '@fortawesome/free-solid-svg-icons';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  faEye=faEye
  errorMessage = null
  emailError = null
  passwordError=null
  confirmPassError=null
  isLoading=false;
  registerSuccess=false
  constructor(private authService:AuthService){}


  showPassword: boolean = false;
  showConfirmPass:boolean = false

  
  onSubmit(form:NgForm)
  {
   
  
    this.isLoading=true;
    console.log(form.value)
    this.authService.signupFormSubmit(form.value).subscribe(response=>
      {
        console.log(response)
        this.errorMessage = null
        this.isLoading =false
        this.registerSuccess=true
     
      },
      error=>
      {
        console.log(error.error)
        this.errorMessage = error.error.message
        console.log(this.errorMessage)
        this.isLoading =false
        if(error.error.message ==='Must be a valid email address')
        {
          this.emailError = error.error.message
        }
        else if(error.error.message ==='Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length')
        {
          this.passwordError = error.error.message
          this.emailError = null
        }
        else if(error.error.message==='Passwords do not matching')
        {
          this.emailError = null
          this.passwordError=null
          this.confirmPassError = error.error.message
        }
      })

   
  }



  togglePasswordVisibility()
  {
    this.showPassword = !this.showPassword;
  }
  togglePasswordConfirmVisibility()
  {
    this.showConfirmPass = !this.showConfirmPass;
  }
}

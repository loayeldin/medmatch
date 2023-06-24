import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from 'rxjs';
import { Route, Router } from '@angular/router';


import { User } from "./user.model";
import { fas } from '@fortawesome/free-solid-svg-icons';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new BehaviorSubject<User>(<User>({}))
  user = new BehaviorSubject<User>({} as User);
  loggedIn= new BehaviorSubject<boolean>(false)
  
  constructor(private http:HttpClient,private router:Router) { }
  signupFormSubmit(formValue:any) {
   console.log(formValue.username)
   return this.http.post('https://medmatch.onrender.com/signup',
   {
    email:formValue.email,
    userName:formValue.username,
    password:formValue.password,
    confirmPassword:formValue.confirmPassword
   })
  }

  signinFormSubmit(formValue:any)
  {
    return this.http.post('https://medmatch.onrender.com/login',
    {
     email:formValue.email,
   
     password:formValue.password,
   
    })
    .pipe(
      tap(resData=>{
        console.log(resData)
        this.handleLogin(resData)
      })
    )
  }

  private handleLogin(resData:any)
  {
      // const expirationDate = new Date( new Date().getTime()+ resData.expiresIn*1000) 
     
      
      const words = resData.message.split(' ');
      words.shift();
      let userName = words.join(' ')
      console.log(userName)
      const newUser = new User(userName,resData.message,resData.token,resData.expiresIn)
      this.user.next(newUser)
      console.log(this.user.value)
      this.loggedIn.next(true)
      console.log(this.loggedIn)
      this.router.navigate(['/home'])
      
      
  }



}



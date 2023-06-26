import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subscription, interval, tap } from 'rxjs';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



import { User } from "./user.model";
import { fas } from '@fortawesome/free-solid-svg-icons';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new BehaviorSubject<User>(<User>({}))
  user = new BehaviorSubject<User>({} as User);
  loggedIn= new BehaviorSubject<boolean>(false);
  // token_key= new BehaviorSubject<any>(null);
  // expireDate = new BehaviorSubject<any>(null);
  private sessionCheck!: Subscription;
  constructor(private http:HttpClient,private router:Router,private CookieService:CookieService) { }


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
      const newUser = new User(userName,resData.token,resData.expiresIn)
      this.user.next(newUser)
      
      console.log(this.user.value)
     
      this.setCookies(this.user.value.token,this.user.value._tokenExpirationDate,this.user.value.userName)
    
      this.loggedIn.next(true)
      this.getCookies()
      this.router.navigate(['/home'])
      
      
  }

  setCookies(token:any,expireData:any,username:any)
  {

   
    this.CookieService.set('userName',username)
    this.CookieService.set('token',token)
    this.CookieService.set('expireDate',expireData);
    
    
    
    // const intervalSubscription = interval(1000).subscribe((data) => {
    //   // Code to be executed on each interval
    //   if((expireData-3595) == data)
    //   {
    //     console.log(expireData-3595,data);
    //     this.logOut()
    //     intervalSubscription.unsubscribe()
        
    //   }else
    //   {
    //     console.log(expireData-3595,data);
    //     this.CookieService.set('currentTime',String(data));
    //   }
     
    //   // Perform other actions here
    // });

  
  }
  getCookies()
  {

    

    if(this.CookieService.check('token'))
    {
      console.log('yes')
      const newUser = new User(this.CookieService.get('userName'),this.CookieService.get('token'),this.CookieService.get('expireDate'))
      this.user.next(newUser)
      console.log(this.user.value)
    }
    else
    {
      console.log('no')
    }
  

   
  
  }
  deleteCookies()
  {
    this.CookieService.deleteAll()
  }

  logOut()
  {
    this.user.next(<User>({}))
   
    this.router.navigate(['/signin'])
    this.loggedIn.next(false)
    this.deleteCookies()
  }

  
// timeOut()
// {
  
//   const intervalSubscription = interval(1000).subscribe((data) => {
//     let zero = this.CookieService.get('currentTime');
//     let expireDate = this.CookieService.get('expireDate');
    
//     // Code to be executed on each interval
//     if (Number(expireDate) - (3590 + Number(zero)) === data) {
//       console.log(Number(expireDate) - (3300 + Number(zero)), data);
//       this.logOut();
//       intervalSubscription.unsubscribe();
//     } else {
//     // Perform other actions here
//     console.log(Number(expireDate) - (3300 + Number(zero)), data);
//     this.CookieService.set('currentTime', String(data));
//     }
      
//   });
// }
}



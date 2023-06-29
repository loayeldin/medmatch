import { Component,HostListener  } from '@angular/core';
import { faMagnifyingGlass,faUser,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from './navbar.service';
import { AuthService } from '../auth/auth.service';
import {  Router } from '@angular/router';

import { User } from "../auth/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  faUser=faUser
  loggedIn=false
  faCartShopping=faCartShopping
  username!:string
  isScrolled: boolean = false;
 
  constructor(private navbarService:NavbarService,private authService:AuthService, private router:Router)
  { }

  ngOnInit()
  {
    
    window.addEventListener('scroll', ()=>{ this.isScrolled = window.pageYOffset > 80;});
  //  this.authService.loggedIn.subscribe(data=>
  //   {
  //     if(data)
  //     {
  //       this.loggedIn =true
  //       this.authService.user.subscribe(data=>
  //         {
  //           console.log(data)
  //           this.username =data.userName
  //         })
     
  
  //     }
  //     else
  //     {
  //       this.loggedIn =false
  //     }
  //   })



    this.authService.getCookies()
    this.authService.user.subscribe(data=>
     {
      //  if(data)
      //  {
      
      //    this.loggedIn=true
      //    this.authService.user.subscribe(data=>
      //     {
      //       console.log(data)
      //       this.username =data.userName
      //     })

      //    console.log(data)
      //  }
      //  else
      //  {
      //    console.log('a7aaa')
      //     this.loggedIn=false

      //  }

      if (Object.keys(this.authService.user.getValue()).length !== 0) {
        // `user` variable contains values
        // Perform your logic here
        this.authService.user.subscribe(data=>
          {
            this.username =data.userName
          })
        this.loggedIn=true

         console.log(data)


      } else {
        // `user` variable does not contain values
        // Perform your logic here
       
         this.loggedIn=false
      }
     })

    

    
  }

  logOut()
  {
    // this.authService.user.next(<User>({}))
    // this.loggedIn = false
    // this.router.navigate(['/signin'])
    // this.authService.loggedIn.next(false)
    // this.authService.deleteCookies()
    this.authService.logOut()
  }


}

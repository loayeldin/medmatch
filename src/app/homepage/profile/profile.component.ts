import { Component } from '@angular/core';


import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { faUser,faRectangleList,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

import { User } from "../../auth/user.model";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  faUser=faUser
  faMagnifyingGlass=faMagnifyingGlass
  faRectangleList=faRectangleList
  newUserName:any
  oldProfileData!:any
  newProfileData!:any
  oldUserName!:any
  profileLoaded = false
  searchHistory!:any
  orderHistory!:any
  orderItemsId!:any
  email:any;
  orderDrugDetails:any
  updateUserN: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

constructor(private http:HttpClient, private AuthService:AuthService){}

ngOnInit()
  {
    this.AuthService.user.subscribe(data=>
      {
        console.log(data)
        this.oldProfileData = data
        this.getProfileData()
      
      })
  }
  onSubmit(form:NgForm)
  {
    console.log(form.value)
    this.newUserName = form.value
    this.updateUserName(form.value)


  }





  
  getProfileData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.oldProfileData.token}`
    });

   return this.http.get('https://medmatch.onrender.com/profile', { headers }).subscribe(
      (response) => {
        // Handle the response
        console.log(response)
        this.newProfileData = response
        console.log(this.newProfileData.user.email)
        this.email = this.newProfileData.user.email
        this.oldUserName = this.newProfileData.user.userName

        //start searchhistory
        this.searchHistory=this.newProfileData.user.searchHistory
      
        console.log(this.searchHistory)
        //end searchhistory

        

        //start orderhistory
        this.orderHistory = this.newProfileData.user.orderHistory
        this.orderItemsId = this.orderHistory[0].items[0].drug
       
      this.getDrugDetails(this.orderItemsId)
        

        //end orderhistory
       
      },
      (error) => {
        // Handle errors
        console.log(error.error)
      }
    );

   
  }

  updateUserName(username:any)
  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.oldProfileData.token}`
    });

   return this.http.put('https://medmatch.onrender.com/editUser',username,{ headers }).subscribe(
      (response) => {
        // Handle the response
        console.log(response)
      
        const currentUser = this.AuthService.user.getValue();
        currentUser.userName = username.userName
        this.AuthService.user.next(currentUser)
        console.log(this.AuthService.user.value.userName,'aaaaaaaaaaa')
   
      },
      (error) => {
        // Handle errors
        console.log(error.error)
       
      }
    );
  }






  getDrugDetails(drugsId: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.oldProfileData.token}`
    });

    return this.http.get(`https://medmatch.onrender.com/drug/${drugsId}`, { headers }).subscribe(
      (response) => {
        // Handle the response
       
        this.orderDrugDetails = response
        console.log(this.orderDrugDetails)
        this.profileLoaded = true
      },
      (error) => {
        // Handle errors
        console.log(error.error);
      }
    );
  }




}

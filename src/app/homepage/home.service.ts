import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private authservice:AuthService,private http:HttpClient,private router:Router) { }
 

  searchResultDrugs = new BehaviorSubject<{}>([]);

  AlterDrugs = new BehaviorSubject<object>({});
  alterDrugsloaded= new BehaviorSubject<boolean>(false)
  searchDrugsloaded= new BehaviorSubject<boolean>(false)

  searchDrugRequest(drug:any)
  {
    this.searchDrugsloaded.next(false)
    console.log(drug)
    return this.http.get(`https://medmatch.onrender.com/search?search=${drug}` )
    .subscribe(data=>
      {
        console.log(data)
      
        // this.router.navigate(['/searchResult'])
        this.handleSearchDrugRequest(data)
      },
      error=>
      {
        this.handleSearchDrugRequest(error.error)
        console.log(error.error)
      })
    
  }


  private handleSearchDrugRequest(resData:any)
  {
      
     
    console.log(resData.drugs)
    this.searchResultDrugs.next(resData)
    this.searchDrugsloaded.next(true)
    this.router.navigate(['/searchResult'])
      
      
  }


  searchAlterDrugs(id:any)
  {
    this.alterDrugsloaded.next(false)
    return this.http.get(`https://medmatch.onrender.com/similarDrugs/${id}`)
    .subscribe(data=>{

      this.handleReq(data)
      console.log(data)
    },
    error=>
    {
      this.handleReq(error)
      console.log(error)
    }
    
    )
   
  }
  handleReq(data:any)
  {
   
    this.AlterDrugs.next(data)
    console.log(this.AlterDrugs)
    this.alterDrugsloaded.next(true)
 
  }
 
}

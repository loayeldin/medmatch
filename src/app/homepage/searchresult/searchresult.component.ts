import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HomeService } from '../home.service';
import { faMagnifyingGlass,faUser ,faArrowRight, fas} from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent {
  constructor(private HomeService:HomeService ,private elementRef: ElementRef, private renderer: Renderer2){}
  searchResult:any
  errorSearch:any
  alterDrugsObj:any
  alterDrugsData:any
  alterready = false
  searchResultReady = true
  faMagnifyingGlass = faMagnifyingGlass;
  ngOnInit()
  {
    // console.log(this.HomeService.searchResultDrugs.value)
    this.HomeService.searchResultDrugs.subscribe(data=>{
   
      this.searchResult = data

      console.log(this.searchResult)

      if(this.searchResult.message === 'The drug is not found')
      {
        this.errorSearch = this.searchResult.message
        console.log(this.searchResult.message)
      }else
      {
        console.log(this.searchResult.message)
        this.errorSearch=null
      }
    
    })


    this.HomeService.AlterDrugs.subscribe(data=>
      {
        this.alterDrugsObj = data
        this.alterDrugsData= this.alterDrugsObj.similarDrugs
        console.log(this.alterDrugsData +'aaaa')
      
      })

  
  
  
      this.HomeService.alterDrugsloaded.subscribe(data=>
        {
          if(data)
          {
            this.alterready=true
          }
          else
          {
            this.alterready=false
          }
        })




  
  }
  



  searchh(value:any)
  {
    
    this.HomeService.searchDrugRequest(value.value)
    
        this.HomeService.searchDrugsloaded.subscribe(data=>
          {
            if(data)
            {
              this.searchResultReady=true
            }
            else
            {
              this.searchResultReady=false
            }
          })
  }
  getAlternatives(index:number)
  {
   
    console.log(index)
    let id = this.searchResult.drugs[index]._id
    console.log(id)
    this.HomeService.searchAlterDrugs(id)
   
  }



  // handleReq(data:any)
  // {
  //   this.alterDrugsObj = data
  //   this.alterDrugsData = data.similarDrugs
  //   console.log(this.alterDrugsObj)
  //   this.allready=true
  // }

 
}

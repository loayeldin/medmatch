import { Component, ElementRef,ViewChild } from '@angular/core';
import { HomeService } from '../home.service';
import { faMagnifyingGlass,faUser ,faArrowRight, fas,faCheck} from '@fortawesome/free-solid-svg-icons';
declare var $:any
import { NgForm } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent {
  
  constructor(private HomeService:HomeService ,private elementRef: ElementRef,private http:HttpClient,private authService:AuthService){}
  searchResult:any
  errorSearch:any
  alterDrugsObj:any
  alterDrugsData:any
  alterready = false
  searchResultReady = true
  faMagnifyingGlass = faMagnifyingGlass;
  faCheck=faCheck
  drugQuantity!:number
  drugId:any
  ShowCartData!:any
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
  getDrugId(index:number)
  {
    let id = this.searchResult.drugs[index]._id
    this.drugId=id
    console.log(id)

  }
  onSubmit(form:NgForm)
  {
    console.log(form.value)
    if(this.drugId)
    {
      console.log('suces')
      this.addDrugToCart(form)
    }else
    {
      console.log('err')
    }
  }
  // getDrugQuantity()
  // {
  //   console.log(this.drugQuantity)

  //   if(this.drugId && this.drugQuantity)
  //   {
  //     console.log('suces')
  //     this.addDrugToCart()
  //   }else
  //   {
  //     console.log('err')
  //   }

  // }

  addDrugToCart(quantityForm:NgForm)
  {
    let token = this.authService.user.value.token
 
console.log(quantityForm.value,this.drugId,token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

   return this.http.post(`https://medmatch.onrender.com/cart/addToCart/${this.drugId}`,
   
   quantityForm.value,

   { headers }
   
   ).subscribe(
      (response) => {
        // Handle the response
        console.log(response)
        this.showSuccessMsg()
        quantityForm.resetForm();
     
      },
      (error) => {
        // Handle errors
        console.log(error.error.message)
       
      }
    );
     
  }

  showSuccessMsg()
  {
    $('#staticBackdropquantity').modal('hide') 
      const comDiv = $('.overlay');
      console.log(comDiv)
    
    
      // comDiv.fadeIn()
    
      comDiv.fadeIn(700,function(){
        $('.verify-icon').fadeIn(300,function(){  
          $('.iconn').fadeIn(180,function(){ 
            $('.thank-you-header').fadeIn(200,function(){
              $('.thank-you-parag').fadeIn(200,function(){ 
                $('.thank-you-btn').fadeIn(200)})})})})});
 
                this.showCartLength()

  }


  hideSuccessMsg()
  {
    $('.overlay').css('display','none')
    $('.verify-icon').fadeOut()
    $('.iconn').fadeOut()
    $('.thank-you-header').fadeOut()
    $('.thank-you-parag').fadeOut()
    $('.thank-you-btn').fadeOut()
    
  }



  showCartLength()
  {
    
    let token = this.authService.user.value.token
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('https://medmatch.onrender.com/cart',{headers}).subscribe(data=>{
      console.log(data)
    
    if(data !=null)
    {
     
      this.handleshowCartLength(data)
    }else if(data==null)
    {
      
      this.ShowCartData = [] 
      this.authService.cartItemsNumber.next(0)
  
     
    }
     
    },
    err=>{
      console.log(err.error)
      
    }
    )
  }


  handleshowCartLength(data:any)
  {
 
    this.ShowCartData = data.cart.items
    this.authService.cartItemsNumber.next(this.ShowCartData.length)
    
    
   
 
  
  
    
  }

 
}

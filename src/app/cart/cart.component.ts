import { Component, Injectable, Input } from '@angular/core';
import { FormControl,FormBuilder,FormGroup ,FormArray, Validators, NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { faCheck,faTrash,faTruck} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

declare var $:any
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class CartComponent {
  // counterForm!: FormGroup;
  ShowCartData!:any
  faTrash=faTrash
  faTruck=faTruck
  faCheck=faCheck
  totalPrice:number = 0
  itemsNumber:number = 0
  shippingAddress!:string
  phone!:string
  paymentMethod:string = 'CashOnDelivery'
  // itemsNumber= new BehaviorSubject<number>(0);

  cartLoaded = true
  constructor(private http:HttpClient,private authService:AuthService,private formBuilder: FormBuilder){}
  // counterFormControl = new FormControl();

  dynamicForm!: FormGroup;

  ngOnInit()
  {
    this.dynamicForm = this.formBuilder.group({
      quantity: this.formBuilder.array([])
    });
   
    this.showCart()

    console.log(this.dynamicForm)
  

    console.log(this.dynamicForm)
    

  }






  get quantity(): FormArray {

    return this.dynamicForm.get('quantity') as FormArray;
  } // مهمه فشخ في form array




  // increment() {
  //   if(this.counterFormControl.value !=null)
  //  {
  //   const currentValue = this.counterFormControl.value;
  //   this.counterFormControl.setValue(currentValue + 1);
  //  }
  // }

  // decrement() {
  //  if(this.counterFormControl.value !=null)
  //  {
  //   const currentValue = this.counterFormControl.value;
  //   this.counterFormControl.setValue(currentValue - 1);
  //  }
  // }


  test()
  {
    console.log(this.dynamicForm.value)
  }
  onQuantityChange(quantityChanged:any,index:number)
  {
    let token = this.authService.user.value.token
    console.log(this.ShowCartData)
    let changedDrugId=this.ShowCartData[index]._id
    console.log({"quantity":Number(quantityChanged.value)},token,changedDrugId)




 
 
      
  }


  showCart()
  {
    this.cartLoaded = false
    let token = this.authService.user.value.token
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('https://medmatch.onrender.com/cart',{headers}).subscribe(data=>{
      console.log(data)
    
    if(data !=null)
    {
     
      this.handleCartData(data)
    }else if(data==null)
    {
      this.totalPrice = 0
      this.ShowCartData = [] 
      this.authService.cartItemsNumber.next(0)
      this.itemsNumber = 0
      this.cartLoaded = true
    }
     
    },
    err=>{
      console.log(err.error)
      
    }
    )
  }


  handleCartData(data:any)
  {
    this.totalPrice = data.totalPrice
    this.ShowCartData = data.cart.items
    this.authService.cartItemsNumber.next(this.ShowCartData.length)
    this.itemsNumber =  this.authService.cartItemsNumber.value
    this.cartLoaded = true
    console.log(this.ShowCartData,this.authService.cartItemsNumber)

    const quantityArray = this.dynamicForm.get('quantity') as FormArray;
    console.log(quantityArray)
    this.ShowCartData.forEach((item:any) => {
      quantityArray.push(this.formBuilder.control(item.quantity, Validators.required));
    });
  
  
    
  }



  removeItem(index:number)
  {   
    
    let token = this.authService.user.value.token

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(index)
    let itemId= this.ShowCartData[index]._id
    console.log(itemId)
    return this.http.delete(`https://medmatch.onrender.com/cart/removeItem/${itemId}`,{headers}).subscribe(data=>{
      console.log(data)
      this.showSuccessMsg()
      this.showCart()
    },error=>{
      console.log(error.error)
    })
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
 

  }

  onSubmitOrder(form:NgForm)
  {
    console.log(form.value)
    this.submitOrderPost(form.value)
  }

  submitOrderPost(form:NgForm)
  {
   console.log(form)
    let token = this.authService.user.value.token
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('https://medmatch.onrender.com/order/checkout',form,{headers}).subscribe(data=>{
      console.log(data)
     
    },
    err=>{
      console.log(err.error)
      
    }
    )
  }

}



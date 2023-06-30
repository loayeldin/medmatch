import { Component, Input } from '@angular/core';
import { FormControl,FormBuilder,FormGroup ,FormArray, Validators} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  counterForm!: FormGroup;
  ShowCartData!:any
  totalPrice:number = 0
  itemsNumber:number = 0
  cartLoaded = true
  constructor(private http:HttpClient,private authService:AuthService,private formBuilder: FormBuilder){}
  counterFormControl = new FormControl();

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

    console.log(this.dynamicForm.get('quantity') as FormArray)
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
    console.log(this.counterFormControl.value)
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
    this.itemsNumber = this.ShowCartData.length
    this.cartLoaded = true
    console.log(this.ShowCartData,this.itemsNumber)

    const quantityArray = this.dynamicForm.get('quantity') as FormArray;
    console.log(quantityArray)
    this.ShowCartData.forEach((item:any) => {
      console.log(item.quantity)
      quantityArray.push(this.formBuilder.control(item.quantity, Validators.required));
      console.log(this.dynamicForm.value)
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
      this.showCart()
    },error=>{
      console.log(error.error)
    })
  }
}
function quantity() {
  throw new Error('Function not implemented.');
}


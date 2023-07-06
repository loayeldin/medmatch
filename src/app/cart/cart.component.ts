import { Component, Injectable, Input } from '@angular/core';
import { FormControl,FormBuilder,FormGroup ,FormArray, Validators, NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { faCheck,faTrash,faTruck} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import anime from 'animejs/lib/anime.es.js';







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
  paymentMethod!:string 
  cartHasData=false
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
    
    this.paymentMethod = 'cashOnDelivery'



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
      console.log(this.ShowCartData)
    
    if(data !=null)
    {
     
      this.handleCartData(data)
    }else if(data==null)
    {
      this.totalPrice = 0
      this.ShowCartData = undefined
      this.authService.cartItemsNumber.next(0)
      this.itemsNumber = 0
      this.cartLoaded = true
      console.log(this.ShowCartData)
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
    console.log(this.ShowCartData ,this.ShowCartData.length,this.authService.cartItemsNumber)

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

 //// hide 
  hideSuccessMsg()
  {
    $('.overlay').css('display','none')
    $('.verify-icon').fadeOut()
    $('.iconn').fadeOut()
    $('.thank-you-header').fadeOut()
    $('.thank-you-parag').fadeOut()
    $('.thank-you-btn').fadeOut()
    
  } 
  ///-----/////////////////
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
    console.log(form.form.controls['shippingAddress'] )
  


    this.submitOrderPost(form.value,form)

  }

  submitOrderPost(form:NgForm,NgForm:NgForm)
  {
   console.log(form)
    let token = this.authService.user.value.token
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('https://medmatch.onrender.com/order/checkout',form,{headers}).subscribe(data=>{
      console.log(data)
        
      const timeline = anime.timeline({
        easing: 'easeInSine',
      })
  
      timeline.add({
        targets: '.btn-order .default',
        opacity: [1, 0],
        duration: 200
      })
  
      timeline.add({
        targets: '.btn-order',
        height: ['50px', '6px'],
        duration: 400
      })
  
      timeline.add({
        targets: '.car',
        opacity: [0, 1]
      }, '-=600')
  
      timeline.add({
        targets: '.box',
        translateX: [0, '210px'],
        duration: 300
      })
  
      timeline.add({
        targets: '.box',
        translateY: [0, '90px'],
        duration: 300
      })
  
      timeline.add({
        targets: '.light',
        opacity: [0, 1],
        duration: 200
      })
  
      timeline.add({
        targets: '.car',
        translateX: [0, '130px'],
        duration: 800,
        easing: 'easeInQuart',
      })
  
      timeline.add({
        targets: '.car',
        opacity: [1, 0]
      }, '-=600')
  
      timeline.add({
        targets: '.btn-order',
        height: ['6px', '50px'],
        duration: 400
      })
  
      timeline.add({
        targets: '.btn-order .complited',
        opacity: [0, 1],
        duration: 200
      })
  
      timeline.add({
        targets: '.complited svg',
        strokeDashoffset: ['16px', 0],
        duration: 300
      })
  
      timeline.finished.then(() => {
        // Reset the properties of your elements to their initial values
  
        // anime({
        //   targets: '.btn-order .complited',
        //   opacity: [1, 0],
        //   duration: 1500
        // })
        // anime({
        //   targets: '.complited svg',
        //   strokeDashoffset: [0,'16px'],
        //   duration: 700
        // })
        // anime({
        //   targets: '.btn-order .default',
        //   opacity: [0,1],
        //   duration: 1500,
        // });
      
        // anime({
        //   targets: '.btn-order',
        //   height: '50px',
        //   duration: 100,
        // });
      
        // anime({
        //   targets: '.car',
        //   opacity: 0,
        //   duration: 100,
        // });
      
        // Reset other properties of your elements as needed
        this.showCart()
        NgForm.resetForm()
      });
    
  
  
    },
    err=>{
      console.log(err.error)
      
    }
    )
  }

}



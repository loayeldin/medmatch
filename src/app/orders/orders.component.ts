import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './orders.model';

declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  orders: Order []= []

  ngOnInit(): void {
    this.checkOrders()
  }

  checkOrders(){
    const orderApi = 'https://medmatch.onrender.com/order/Orders';
    const token = this.authService.user.value.token;

    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })

    this.http.get(orderApi, {headers}).subscribe((data:any)=>{
      this.orders = data.orders
    })
  }

  cancelOrder(orderId: string){
    const delOrderApi = `https://medmatch.onrender.com/order/cancelOrder/${orderId}`;
    const token = this.authService.user.value.token;

    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })

    this.http.delete(delOrderApi , {headers}).subscribe((response : any)=>{
      console.log('Order canceled Successfully');
      this.checkOrders();
    })
      
      
    
  }

  
}

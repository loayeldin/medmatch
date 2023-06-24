import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Observable, retry } from 'rxjs';

import{Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class MyhomeGuard implements CanActivate {
 
  constructor(private router: Router, private AuthService:AuthService ) {}

  canActivate():any {

    if(this.AuthService.user.getValue() != null)
    {
        return true
    }else
    {
        this.router.navigate(['/signin'])

    }
   
  
  }

  
}

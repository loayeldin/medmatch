import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  backgroundColor: string = '#ff0000';
  constructor() { }
  setBackgroundColor(color: string) {
    this.backgroundColor = color;
  }
}

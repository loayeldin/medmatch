import { Component } from '@angular/core';
import {  ViewChild, ElementRef } from '@angular/core'
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {

  @ViewChild('btnRef') btnRef!: ElementRef<HTMLElement> | null;
  @ViewChild('mobileRef') mobileRef!: ElementRef<HTMLElement> | null;
  @ViewChild('desktopRef') desktopRef!: ElementRef<HTMLElement> | null;

  leftClick(): void {
    if (this.btnRef &&this.mobileRef && this.desktopRef) {
      console.log(this.btnRef);
      this.btnRef.nativeElement.style.left = '6px';
      this.mobileRef.nativeElement.style.color = 'var(--primarygreen-color)'
      this.desktopRef.nativeElement.style.color = ' rgba(156,163,175)'
    }
  }

  rightClick(): void {
    if (this.btnRef &&this.mobileRef && this.desktopRef) {
      console.log('aaaaaa');
      this.btnRef.nativeElement.style.left = '145px';
      this.desktopRef.nativeElement.style.color = 'var(--primarygreen-color)'
      this.mobileRef.nativeElement.style.color = ' rgba(156,163,175)'
    }
  }


}

import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent {



  img:string ="assets/img/img.jpg"

  team = [
   {
     name: "Ahmed Gamal",
     position: "Frontend Developer",
     image: "assets/img/gemy.jpg",

   },
   {
     name: "Loay Eldeen Gamal",
     position: "Frontend Developer",
     image: "assets/img/loay.jpg",

   },
   {
     name: "Omar Aly",
     position: "Mobile Developer",
     image: "assets/img/omar_aly.jpg",

   },
   {
     name: "Mahmoud sa'eed",
     position: "Mobile Developer",
     image: "assets/img/onsy.jpg",

   },
   {
     name: "Hosssam Eltayeb",
     position: "Backend Developer",
     image: "assets/img/hossam.jpg",

   },
   {
     name: "Youssef abdeen",
     position: "AI Engineer",
     image: "assets/img/abdeen.jpg",

   },
   {
     name: "Mostafa Mohamed",
     position: "Mobile Develope",
     image: "assets/img/mostafa.jpg",

   },
   {
     name: "Yehia Mohamed",
     position: "Backend Developer",
     image: "assets/img/yehia.jpg",

   },
   {
     name: "Fares Keriony",
     position: "Backend Developer",
     image: "assets/img/fares.jpg",

   },
   {
     name: "Hadi Mohamed",
     position: "Backend Developer",
     image: "assets/img/hadi.jpg",

   },
 ];

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchresultComponent } from './homepage/searchresult/searchresult.component';
import { ProfileComponent } from './homepage/profile/profile.component';
import { FeaturesComponent } from './features/features.component';
import { MobilefeaturesComponent } from './features/mobilefeatures/mobilefeatures.component';
import { DesktopfeaturesComponent } from './features/desktopfeatures/desktopfeatures.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'signin',component:SigninComponent},
  {path:'register',component:SignupComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'home',component:HomepageComponent},
  {path:'searchResult',component:SearchresultComponent},
  {path:'profile',component:ProfileComponent},
  {path:'chat',component:ChatComponent},
  {path:'features',component:FeaturesComponent,children:[
    {path:'',redirectTo:'mobilefeatures', pathMatch:'full'},
    {path:'mobilefeatures',component:MobilefeaturesComponent},
    {path:'desktopfeatures',component:DesktopfeaturesComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

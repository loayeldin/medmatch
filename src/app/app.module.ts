import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SearchresultComponent } from './homepage/searchresult/searchresult.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutusComponent } from './aboutus/aboutus.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ProfileComponent } from './homepage/profile/profile.component';
import { FeaturesComponent } from './features/features.component';
import { MobilefeaturesComponent } from './features/mobilefeatures/mobilefeatures.component';
import { DesktopfeaturesComponent } from './features/desktopfeatures/desktopfeatures.component';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';
import {CookieService} from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    SearchresultComponent,
    AboutusComponent,
    LoadingSpinnerComponent,
    ProfileComponent,
    FeaturesComponent,
    MobilefeaturesComponent,
    DesktopfeaturesComponent,
    FooterComponent,
    ChatComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
    
    
 

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

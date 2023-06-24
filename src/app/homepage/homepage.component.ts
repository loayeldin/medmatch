import { Component } from '@angular/core';
import { faMagnifyingGlass,faUser ,faDownload,faAppleAlt,faPills,faListCheck,faCircleInfo,faArrowRight,faSearch, faPeopleGroup, faMobile, faShieldHalved,faKey} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faAppleAlt=faAppleAlt
  faSearch=faSearch;
  faDownload=faDownload
  faUser=faUser
  faPills=faPills
  faListCheck=faListCheck
  faMobile=faMobile;
  faArrowRight=faArrowRight
  faInfo=faCircleInfo
  faShieldHalved=faShieldHalved
  faPeopleGroup=faPeopleGroup
  faKey=faKey
  imgPath:string;
  loggedIn=false
  searchValue:any
  constructor(private authService:AuthService,private HomeService:HomeService){
    this.imgPath = "../../assets/scan.jpg"
  }
  onHoverIn1() {
    this.imgPath = '../../assets/scan.jpg';
  }
  onHoverIn2() {
    this.imgPath = '../../assets/searchhistory.jpg';
  }
  onHoverIn3() {
    this.imgPath = '../../assets/similar.jpg';
  }
  onHoverIn4() {
    this.imgPath = '../../assets/drugdetails.jpg';
  }
  onHoverOut1()
  {
    // this.imgPath='../../assets/9036de7ca8a5952a7acc3c345ce62201.avif'

  }

  ngOnInit()
  {
                // gooood solution
    // if (Object.keys(this.authService.user.getValue()).length === 0) {
    //   // User is empty
    //   // Perform the desired actions here
    //   console.log('not user')
    // } else {
    //   // User is not empty
    //   // Perform the desired actions here
    //   console.log("user")
    // }
                          //another gooood solution
    console.log(this.authService.loggedIn.value)

    this.authService.loggedIn.subscribe(data=>
      {
        if(data)
        {
          this.loggedIn=true
          console.log("user")
        }
        else
        {
          console.log("not user")
          this.loggedIn=false
        }
      })



    // if(this.authService.loggedIn.value)
    // {
    //   this.loggedIn=true
    //   console.log("user")
    // }
    // else
    // {
    //   console.log("not user")
    //   this.loggedIn=false
    // }
    
    
    
    
    
    
    
  }

  search()
  {
    console.log("test search :" + this.searchValue)
    this.HomeService.searchDrugRequest(this.searchValue)
  }
}

import { Component, OnInit } from '@angular/core';
import { UserType } from '../../models/userType';
import { LoginInfo } from '../../models/loginInfo';
import { LoginService } from '../../services/main/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: LoginInfo;
  admin: string = UserType.ADMIN;
  company: string = UserType.COMPANY;
  customer: string = UserType.CUSTOMER;

  constructor(private loginService: LoginService) {
    this.user = new LoginInfo("", "", UserType.ADMIN);
  }

  public changeUserType(userType) {
    this.user.userType = userType;
  }

  ngOnInit() {
  }

  public login() {
    this.loginService.login(this.user).subscribe(res => {
      console.log(res);
    });
  }
}

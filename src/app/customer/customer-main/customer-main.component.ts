import { Component, OnInit } from '@angular/core';
import { UserType } from '../../models/userType';
import { Router } from '@angular/router';
import { LoginService } from '../../services/main/login.service';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {

  constructor(private router: Router, private sessionService: LoginService) { }

  ngOnInit() {
    this.sessionService.getSessionInfo().subscribe(res => {
      if(!(res === UserType.CUSTOMER.toUpperCase()))
        this.router.navigate(["/home"]);
    });
  }

}

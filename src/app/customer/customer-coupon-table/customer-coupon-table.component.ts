import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-coupon-table',
  templateUrl: './customer-coupon-table.component.html',
  styleUrls: ['./customer-coupon-table.component.css']
})
export class CustomerCouponTableComponent implements OnInit {

  coupons: any[];

  constructor(private customerService: CustomerService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.customerService.getPurchasedCoupons().subscribe(
      res => {
        if (res instanceof Array) {
          this.coupons = this.fixArray(res);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  public fixArray(array) {
    array.forEach(couponElement => {
      couponElement.color = "#f9e2cc;"
      couponElement.startDate = JSON.stringify(couponElement.startDate).slice(0, (JSON.stringify(couponElement.startDate).length - 6)) + '"';
      var date: Date = new Date(JSON.parse(couponElement.startDate));
      couponElement.startDate = date.toDateString();
      couponElement.endDate = JSON.stringify(couponElement.endDate).slice(0, (JSON.stringify(couponElement.endDate).length - 6)) + '"';
      date = new Date(JSON.parse(couponElement.endDate));
      couponElement.endDate = date.toDateString();
      couponElement.endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    });
    return array;
  }

}

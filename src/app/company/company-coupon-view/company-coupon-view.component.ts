import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Coupon } from '../../models/coupon';
import { ApplicationResponse } from '../../models/applicationReponse';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompanyService } from '../../services/company/company.service';
import { DatePipe } from '@angular/common';
import { CouponType } from '../../models/couponType';

@Component({
  selector: 'app-company-coupon-view',
  templateUrl: './company-coupon-view.component.html',
  styleUrls: ['./company-coupon-view.component.css']
})
export class CompanyCouponViewComponent implements OnInit {


  id: number;
  date: Date;
  price: number;
  couponTypes = CouponType;
  type: CouponType = CouponType.RESTAURANTS;
  coupon: Coupon;
  searchById: boolean;
  searchUpToDate: boolean;
  searchUpToPrice: boolean;
  searchByType: boolean;
  response: ApplicationResponse;
  searchResponse: ApplicationResponse;
  @Input() modalRef: BsModalRef;
  @Output() sendCoupons = new EventEmitter();

  constructor(private companyService: CompanyService, private datePipe: DatePipe) {
    this.id = null;
    this.date = null;
    this.coupon = null;
  }

  ngOnInit() {
  }

  public nullify() {
    this.coupon = null;
    this.response = null;
    this.searchResponse = null;
  }

  public findCouponsUpToDate() {
    this.coupon = null;
    this.response = null;
    this.searchResponse = null;
    let dateInTime: Date = new Date(JSON.parse(JSON.stringify(this.date)));
    this.companyService.getCouponUpToDate(dateInTime.getTime()).subscribe(
      res => {
        if (res instanceof Array) {
          if (res.length != 0) {
            this.sendCoupons.emit(res);
            setTimeout(() => {
              this.modalRef.hide();
            }, 500);
          } else {
            this.searchResponse = new ApplicationResponse(0, "No coupons before selected date.", "warning");
          }
        }
        else {
          this.searchResponse = res;
          this.searchResponse.alertType = "warning";
        }
      }, err => {
        this.searchResponse = err.error;
        this.searchResponse.alertType = "danger";
      }

    );
  }

  public findCouponsUpToPrice() {
    this.coupon = null;
    this.response = null;
    this.searchResponse = null;
    this.companyService.getCouponUpToPrice(this.price).subscribe(
      res => {
        if (res instanceof Array) {
          if (res.length != 0) {
            this.sendCoupons.emit(res);
            setTimeout(() => {
              this.modalRef.hide();
            }, 500);

          }else {
            this.searchResponse = new ApplicationResponse(0, "No coupons up to selected price.", "warning");
          }
        }
        else {
          this.searchResponse = res;
          this.searchResponse.alertType = "warning";
        }
      }, err => {
        this.searchResponse = err.error;
        this.searchResponse.alertType = "danger";
      }

    );
  }

  public findCouponsByType() {
    this.coupon = null;
    this.response = null;
    this.searchResponse = null;
    this.companyService.getCouponByType(this.type).subscribe(
      res => {
        if (res instanceof Array) {
          if (res.length != 0) {
            this.sendCoupons.emit(res);
            setTimeout(() => {
              this.modalRef.hide();
            }, 500);
          } else {
            this.searchResponse = new ApplicationResponse(0, "No coupons of specified type.", "warning");
          }
        }
        else {
          this.searchResponse = res;
          this.searchResponse.alertType = "warning";
        }
      }, err => {
        this.searchResponse = err.error;
        this.searchResponse.alertType = "danger";
      }
    );
  }

  public findCouponById() {
    this.coupon = null;
    this.response = null;
    this.searchResponse = null;
    this.companyService.getCouponById(this.id).subscribe(
      res => {
        console.log(res);
        if (res.title != null) {
          res.startDate = JSON.stringify(res.startDate).slice(0, (JSON.stringify(res.startDate).length - 6)) + '"';
          var date: Date = new Date(JSON.parse(res.startDate));
          res.startDate = date.toDateString();
          res.endDate = JSON.stringify(res.endDate).slice(0, (JSON.stringify(res.endDate).length - 6)) + '"';
          date = new Date(JSON.parse(res.endDate));
          res.endDate = date.toDateString();
          res.endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
          this.coupon = res;
        }
        else {
          this.searchResponse = res;
          this.searchResponse.alertType = "warning";
        }
      }, err => {
        this.searchResponse = err.error;
        this.searchResponse.alertType = "danger";
      }
    );
  }

  public couponUpdate() {
    return this.companyService.updateCoupon(this.coupon).subscribe(
      res => {
        console.log(res);
        this.response = res;
        if (res.responseCode == 0) {
          this.response.alertType = "danger";
        } else if (res.responseCode == 1) {
          this.response.alertType = "success";
        }
      },
      err => {
        console.log(err.error);
      }
    );;
  }

  public couponRemove() {
    this.companyService.removeCoupon(this.coupon.id).subscribe(
      res => {
        this.response = res;
        if (res.responseCode == 0) {
          this.response.alertType = "danger";
        } else if (res.responseCode == 1) {
          this.response.alertType = "success";
          setTimeout(() => {
            this.response = null;
            this.coupon = null;
          }, 500);
        }
      },
      err => {
        console.log(err.error);
      }
    );
  }

  public closeAlert(num) {
    if (num == 1)
      this.searchResponse = null;
    else
      this.response = null;
  }
}

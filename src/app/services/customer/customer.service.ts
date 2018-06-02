import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../../models/coupon';


@Injectable()
export class CustomerService {

  private _URL: string = "http://localhost:8080/CouponsWebRest/rest/CustomerService/";

  constructor(private http: HttpClient) { }

  public purchaseCoupon(coupon: Coupon) {
    let couponToSend = new Coupon(coupon.id, coupon.title, coupon.startDate, coupon.endDate, coupon.amount - 1 , coupon.type, coupon.message, coupon.price, coupon.image);
    couponToSend.startDate = new Date(JSON.parse(JSON.stringify(coupon.startDate))).toISOString();
    couponToSend.endDate = new Date(JSON.parse(JSON.stringify(coupon.endDate))).toISOString();
    return this.http.post(this._URL + "coupon", couponToSend);
  }

  public getPurchasedCoupons(): Observable<any> {
    return this.http.get(this._URL + "coupon");
  }

  public getPurchasedCouponsByType(): Observable<any> {
    return this.http.get(this._URL + "couponByType");
  }

  public getPurchasedCouponsUpToPrice(): Observable<any> {
    return this.http.get(this._URL + "couponByPrice");
  }

}

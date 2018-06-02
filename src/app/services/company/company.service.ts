import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Coupon } from '../../models/coupon';

@Injectable()
export class CompanyService {

  private _URL: string = "http://localhost:8080/CouponsWebRest/rest/CompanyService/";
  private _COUPON_URL: string = "coupon/";

  constructor(private http: HttpClient) { }

  public createCoupon(coupon: Coupon): Observable<any> {
    return this.http.post(this._URL + this._COUPON_URL, this.couponToSend(coupon));
  }

  public updateCoupon(coupon): Observable<any> {
    return this.http.put(this._URL + this._COUPON_URL, this.couponToSend(coupon));
  }

  public removeCoupon(id): Observable<any> {
    return this.http.delete(this._URL + this._COUPON_URL + id);
  }

  public getCoupons(): Observable<any> {
    return this.http.get(this._URL + this._COUPON_URL);
  }

  public getCouponById(id): Observable<any> {
    return this.http.get(this._URL + this._COUPON_URL + id);
  }

  public getCouponByType(type): Observable<any> {
    return this.http.get(this._URL + "couponByType/" + type);
  }

  public getCouponUpToDate(date: number): Observable<any> {
   
    return this.http.get(this._URL + "couponUpToDate?date=" + date);
  }

  public getCouponUpToPrice(price: number): Observable<any> {
    return this.http.get(this._URL + "couponUpToPrice?price=" + price);
  }

  public getCompanyIncome(): Observable<any> {
    return this.http.get(this._URL + "income");
  }


  private couponToSend(coupon): Coupon {
    let couponToSend = new Coupon(coupon.id, coupon.title, coupon.startDate, coupon.endDate, coupon.amount, coupon.type, coupon.message, coupon.price, coupon.image);
    couponToSend.startDate = new Date(JSON.parse(JSON.stringify(coupon.startDate))).toISOString();
    couponToSend.endDate = new Date(JSON.parse(JSON.stringify(coupon.endDate))).toISOString();
    return couponToSend;
  }
}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AdminService {

  private _URL: string = "http://localhost:8080/CouponsWebRest/rest/AdminService/";
  private _COMPANY_URL: string = "company/";
  private _CUSTOMER_URL: string = "customer/";

  constructor(private http: HttpClient) { }

  public createCompany(company): Observable<any> {
    return this.http.post(this._URL + this._COMPANY_URL, company);
  }

  public updateCompany(company): Observable<any> {
    return this.http.put(this._URL + this._COMPANY_URL, company);
  }

  public getCompany(id: number): Observable<any> {
    return this.http.get(this._URL + this._COMPANY_URL + id);
  }

  public getAllCompanies(): Observable<any> {
    return this.http.get(this._URL + this._COMPANY_URL);
  }

  public deleteCompany(id: number): Observable<any> {
    return this.http.delete(this._URL + this._COMPANY_URL + id);
  }

  public createCustomer(customer): Observable<any> {
    return this.http.post(this._URL + this._CUSTOMER_URL, customer);
  }

  public updateCustomer(customer): Observable<any> {
    return this.http.put(this._URL + this._CUSTOMER_URL, customer);
  }

  public getCustomer(id: number): Observable<any> {
    return this.http.get(this._URL + this._CUSTOMER_URL + id);
  }

  public getAllCustomers(): Observable<any> {
    return this.http.get(this._URL + this._CUSTOMER_URL);
  }

  public deleteCustomer(id: number): Observable<any> {
    return this.http.delete(this._URL + this._CUSTOMER_URL + id);
  }

  public viewAllIncome(): Observable<any> {
    return this.http.get(this._URL + "income");
  }
}

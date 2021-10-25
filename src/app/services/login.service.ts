import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiManager } from './api';
import { query } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatus = new Subject<boolean>();
  constructor(private http:HttpClient) { }
   /**
   * Common Get Data API
   * @param apiUrl
   * @param params
   * @returns {Observable<any>}
   */

  login(apiUrl: any) {
    return this.http.get(apiUrl);

  }


}

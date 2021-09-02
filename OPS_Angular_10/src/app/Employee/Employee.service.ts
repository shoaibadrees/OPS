import { IEmployee } from './../shared/models/IEmployee';
import { ITableList } from './../shared/models/ITable-List';

import { throwError as observableThrowError } from 'rxjs';
//// import { Http, Response } from '@angular/http';
//import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import {IFormSecurity} from '../shared/models/IFormSecurity'
import {  BehaviorSubject} from 'rxjs';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { resolve } from 'q';
import { AppService } from '../shared/services/app.service';

import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// import { IpcNetConnectOpts } from 'net';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = 'http://localhost:21021/api/services/app/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });


  }
//Get All Employee
    getAllEmployees(): Observable<IEmployee[]> {//IEmployee[]
    
    let url: string = this.apiUrl + 'EmployeeService/getAllEmployee' ;
        return this._httpClient.get<IEmployee[]>(url).catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }
//Update Employee
  updateOrInsertEmployee(employee:IEmployee): Observable<boolean> {
    debugger;
    let url = this.apiUrl + 'EmployeeService/UpdateEmployee';
    return this._httpClient.post<boolean>(url, employee).catch(this.handleError);
  }
//Delete Employee
  deleteEmployee(employeeId: number):Observable<boolean>{
    let url = this.apiUrl + 'EmployeeService/deleteEmployee?employeeId='+employeeId;
    return this._httpClient.delete<boolean>(url).catch(this.handleError);
  }

}

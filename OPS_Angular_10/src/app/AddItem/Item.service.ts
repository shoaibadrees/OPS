import { I_Item } from './../shared/models/I_Item';
import { throwError as observableThrowError } from 'rxjs';
//// import { Http, Response } from '@angular/http';
//import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
export class ItemsService {
  apiUrl = 'http://localhost:21021/api/services/app/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });


  }
 getActiveCategoryItems(): Observable<any> {//I_ItemCategory[]
   
    let url: string = this.apiUrl + 'ItemCategoryService/getActiveCategoryItems' ;
    return this._httpClient.get<any>(url).catch(this.handleError);
  }
//Get All Items
  getAllItems(): Observable<I_Item[]> {//I_Item[]

    let url: string = this.apiUrl + 'FoodItemService/getAllItems' ;
    return this._httpClient.get<I_Item[]>(url).catch(this.handleError);
  }
  //Get Item On Id
     getItemOnId(itemId:number):Observable<I_Item[]>{//I_Item
    
    let url: string = this.apiUrl + 'FoodItemService/getItemOnId?itemId='+itemId;
    return this._httpClient.get<I_Item[]>(url).catch(this.handleError);//I_Items
   }  
  getAllActiveItems(): Observable<I_Item[]> {//I_Item[]
    let url: string = this.apiUrl + 'FoodItemService/getAllActiveItems' ;
    return this._httpClient.get<I_Item[]>(url).catch(this.handleError);
  }
//Get All Items On Category
 getItemsOnCategory(categoryId:number):Observable<I_Item[]>{//I_Item
    let url: string = this.apiUrl + 'FoodItemService/getItemOnCategory?categoryId='+categoryId;
    return this._httpClient.get<any[]>(url).catch(this.handleError);//I_Items
  }
   getActiveItemsOnCategory(categoryId:number):Observable<I_Item[]>{//I_Items

    let url: string = this.apiUrl + 'FoodItemService/getActiveItemsOnCategory?categoryId='+categoryId;
    return this._httpClient.get<I_Item[]>(url).catch(this.handleError);//I_Items
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }
//Update Employee
updateOrInsertItem(item:I_Item): Observable<number> {
    let url = this.apiUrl + 'FoodItemService/updateItem';
    return this._httpClient.post<number>(url, item).catch(this.handleError);
  }
//Delete Employee
  deleteItem(itemId: number):Observable<boolean>{
  
    let url = this.apiUrl + 'FoodItemService/deleteItem?itemId='+itemId; ;
    return this._httpClient.delete<boolean>(url).catch(this.handleError);
  }

getItemPhoto(itemId: number): Observable<any> {
   let apiUrl1 = 'http://localhost:21021/';
    const url: string = apiUrl1 + 'File/downloadPhoto?itemId=' + itemId;
    return this._httpClient.get(url, { responseType: 'blob' })
    .catch(this.handleError);
    
  }

  saveItemPhoto(formData: FormData): Observable<any> {
   
     let apiUrl1 = 'http://localhost:21021/';
    let url: string =apiUrl1 + 'File/UploadPhoto' ;
    return this._httpClient.post<any>(url, formData).catch(this.handleError);
      
  }
   cancelItemPhoto(itemId: number):Observable<boolean>{

     let apiUrl1 = 'http://localhost:21021/';
    let url = apiUrl1 + 'File/deleteItemPhoto?itemId='+itemId; ;
    return this._httpClient.delete<boolean>(url).catch(this.handleError);
  }
deleteItemPhoto(itemId: number):Observable<boolean>{

     let apiUrl1 = 'http://localhost:21021/';
    let url = apiUrl1 + 'File/deletePerItemPhoto?itemId='+itemId; ;
    return this._httpClient.delete<boolean>(url).catch(this.handleError);
  }
}

import { I_ItemCategory } from './../shared/models/I_ItemCategory';
import { throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import { resolve } from 'q';
import { AppService } from '../shared/services/app.service';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})

export class ItemCategoryService {
  apiUrl = 'http://localhost:21021/api/services/app/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });

  }
// Get All Category Item Include isActive and is no Active
    getAllCategoryItems(): Observable<I_ItemCategory[]> {//I_ItemCategory[]
    let url: string = this.apiUrl + 'ItemCategoryService/getAllCategoryItems' ;
        return this._httpClient.get<I_ItemCategory[]>(url).catch(this.handleError);
    }
    //Get All Actve Category
  getAllActiveCategory(): Observable<any> { //I_ItemCategory
    let url: string = this.apiUrl + 'ItemCategoryService/getActiveCategoryItems' ;
    return this._httpClient.get<any>(url).catch(this.handleError);
  }
  
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    return observableThrowError(error.error || 'Server error');
  }

  updateOrInsertCategoryItem(itemCategory: I_ItemCategory): Observable<boolean> {
    let url = this.apiUrl + 'ItemCategoryService/updateOrInsertItemCategory';
    return this._httpClient.post<boolean>(url, itemCategory).catch(this.handleError);
  }

  deleteCateogryItem(categoryId: number):Observable<boolean>{
 
    let url = this.apiUrl + 'ItemCategoryService/deleteCategoryItem?categoryId='+categoryId;
    return this._httpClient.delete<boolean>(url).catch(this.handleError);
  }


}

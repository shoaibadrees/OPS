import { IOrderDetail } from 'app/shared/models/IOrderDetail';
import { OrderService } from './../order.service';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ItemsService } from '../../AddItem/Item.service';
import { NotificationService } from '../../Services/notification.service';

@Component({
    selector: 'app-orders',
    templateUrl: './Orders_Dialog.component.html',
    styleUrls: ['./Orders_Dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersDialogComponent implements OnInit {
    requestResult: any = null;
    itemId: number = 0;
    public _orderService: OrderService = null;
    emptyImagePath: any = './assets/img/item_default.png';
    errorImagePath: any = './assets/img/item_error.png'
    loadingImage = './assets/img/item_loading.png';
    imageUrl: any = this.emptyImagePath;
    isSpecialOffer = "true";
    foodQuantity: number = 1;
    classObj: IOrderDetail;
    orderDetail: IOrderDetail;

    OrderList: Array<any> = [];
    constructor(public dialogRef: MatDialogRef<OrdersDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _router: Router,
        private _itemService: ItemsService,
        private notification: NotificationService,
        private _cd: ChangeDetectorRef
    ) {
        if (data != null) {
            //Update Order Items
            if (data.editMode === true) {
                this._orderService = this.data.service;
                this.classObj = data.selectedObj;
                this.itemId = data.selectedObj.id;
                this.foodQuantity = this.classObj.itemQuatity;
            }
            // Add Order Items
            if (data.addMode === true) {
            
                this._orderService = this.data.service;
               // this.classObj = data.selectedObj;
                this.itemId = data.selectedObj.id;

            }
        }
    }

    ngOnInit(): void {
       
           
            this.getItemInfo();
      
    }
    /*   
      btnDecreaseQuantity()
      {
        // check if item already exist in ordered list
        let isFound = false;
        for(let i =0 ;i< this._orderService.orderedItems.length;i++){
            if(this._orderService.orderedItems[i].id == this.classObj.id)
            {
           
              this._orderService.orderedItems[i].quantity= this._orderService.orderedItems[i].quantity - this.foodQuantity ;  
              isFound = true;
              break;
            }
    
        }
        
        if(isFound ==  false)
        {
          this.classObj.quantity = this.foodQuantity;      
          const objToPush = Object.assign({},this.classObj);
          this._orderService.orderedItems.push(objToPush);
        
        }
        
    
      } */
    getItemInfo() {
        if (this.itemId > 0)
        {
            this._itemService.getItemOnId(this.itemId).subscribe(data => {
                this.requestResult = data;
                
                if (this.requestResult.success == true) {
                    this.classObj = this.requestResult.result[0];
                    if (this.classObj.hasPhoto) {
                        this.downloadImage();
                        this._cd.markForCheck();
                    }
                }
            },
                err => {
                    this.notification.fail(err);
                });
        }
        else {
            this._router.navigate(['/Item']);
        }
    }
    downloadImage() {
        
        this.imageUrl = this.loadingImage;
        this._itemService.getItemPhoto(this.itemId)
            .subscribe(data => {
             
                this.showImageFromBytes(data);
                this._cd.markForCheck();
            },
                err => {
                    this.imageUrl = this.errorImagePath;
                    this._cd.markForCheck();
                    // this.imagePath = this.downloadingErrorPath;
                    // this.snackBar.open('Error', 'Problem while downloading the file', { duration: 4000 });
                }
            );
    }
    showImageFromBytes(imageBytes) {
        
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
            this._cd.markForCheck();
        };
        if (imageBytes) {
            reader.readAsDataURL(imageBytes);
            
        }
    }
    btnDecreaseQuantity() {
        var quantity = (document.getElementById("txtQuantity") as HTMLInputElement).value;
        var integer = parseInt(quantity);
        this.foodQuantity = integer - 1;
        return;
    }
    btnAddQuantity() {
        var quantity = (document.getElementById("txtQuantity") as HTMLInputElement).value;
        var integer = parseInt(quantity);
        this.foodQuantity = integer + 1;
        return;
    }

    btnAddToCart() {
        var quantity = (document.getElementById("txtQuantity") as HTMLInputElement).value;
        var integer = parseInt(quantity);
        this.foodQuantity = integer;
        // check if item already exist in ordered list
        let isFound = false;
        for (let i = 0; i < this._orderService.OrderItems.length; i++) {
            if (this._orderService.OrderItems[i].id == this.classObj.id) {
                this._orderService.OrderItems[i].itemQuatity = this._orderService.OrderItems[i].itemQuatity + this.foodQuantity;
                isFound = true;
                break;
              
            }
        }
        if (isFound == false) {

            this.classObj.itemQuatity = this.foodQuantity;
            debugger;
            const objToPush = Object.assign({}, this.classObj);
            this._orderService.OrderItems.push(objToPush);
            this.dialogRef.close();
            this._cd.markForCheck();
        }

    }

    UpdateItem() {

        if (this.data.editMode == true) {
            if (this.data.selectedObj) {

                let isFound = false;
                for (let i = 0; i < this._orderService.OrderItems.length; i++) {
                    if (this._orderService.OrderItems[i].id == this.classObj.id) {
                        var quantity = (document.getElementById("txtQuantity") as HTMLInputElement).value;
                        var integer = parseInt(quantity);
                        this.foodQuantity = integer;
                        this._orderService.OrderItems[i].itemQuatity = this.foodQuantity;
                        if (isFound = true) {
                            this._cd.markForCheck();
                            this.dialogRef.close(isFound);
                        }




                    }
                }
            }
        }
    }

}


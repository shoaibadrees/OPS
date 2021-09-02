import { NotificationService } from 'app/Services/notification.service';
import { NotificationsComponent } from './../notifications/notifications.component';
import { ItemsService } from './../AddItem/Item.service';
import { I_ItemCategory } from './../shared/models/I_ItemCategory';
import { OrderService } from './order.service';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDialogComponent } from './Orders_Dialog/Orders_Dialog.component';
import { I_Item } from 'app/shared/models/I_Item';

import {MediaObserver, MediaChange} from '@angular/flex-layout';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class OrdersComponent implements OnInit, OnDestroy {
    selectedCategoryId = -1;
    allItems: I_Item[] = null;//All Active Items
    Items: I_Item[] = null;
    defaultImagePath: any = './assets/img/item_default.png';
    errorImagePath: any = './assets/img/item_error.png'
    loadingImage = './assets/img/item_loading.png';
    // imageUrl=' C:\Final Year Project\Hotel_Api\aspnet-core\src\OPS.Web.Host\wwwroot\ItemImages\';
    requestResult: any;
    LoadItemOnCategoryId: I_Item[] = null; //I_Item[]
    categoryList: I_ItemCategory[] = null;

//code for responsiveness 
     mediaSub:Subscription;
     deviceXs: boolean;

    constructor(public dialog: MatDialog,
        private _router: Router,
        private notification: NotificationService,
        public _orderService: OrderService,
        public _itemService: ItemsService,
        private _cd: ChangeDetectorRef,
        public mediaObserver:MediaObserver) { }
    ngOnDestroy(): void {
        
        this.mediaSub.unsubscribe();
    }

    ngOnInit(): void {
        this.loadBasicData();
        this.loadAllActiveItems();
        this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
            console.log(result.mqAlias);
            this.deviceXs = result.mqAlias === "xs" ? true : false;
            
        })
    }

    loadBasicData() {

        this._itemService.getActiveCategoryItems().subscribe(data => {
            if (data) {
                this.categoryList = data.result;
                this._cd.markForCheck();
            }
        }, err => {
            this.notification.fail('Error While Importing the Category Items');
        }

        );
    }

    //#region Order Food
    btnOrderFood(obj, isAddMode: boolean) {
        let isFound = false;

        for (let i = 0; i < this._orderService.OrderItems.length; i++) {
            if (this._orderService.OrderItems[i].id == obj.id) {
                isFound = true;
                this.notification.fail('You Have Already Selected the Item Go To Review Card And Update Item');
                break;

            }
        }
        if (isFound == false) {

            const dialogRef = this.dialog.open(OrdersDialogComponent, {
                height: "500px",
                width: "550px",
                data: { service: this._orderService, selectedObj: obj, addMode: isAddMode },
                // panelClass: 'custom1-dialog-container',
            });
            dialogRef.afterClosed().subscribe(result => {

                let isOk: boolean = (result == undefined) ? false : result;
                if (isOk) {
                    this.notification.success(' Order Succcessfully Updated !');
                    // this.loadAllActiveItems();
                    // this._cd.markForCheck();

                }
                else if (isOk == undefined) {
                    // this._cd.markForCheck();
                    // this.loadAllActiveItems();
                }
                this._cd.markForCheck();
            });
            err => {
                console.log(err);
            }
        }
    }
    //#endregion 

  //  #region loadAllItems
    loadAllActiveItems() {
        this._itemService.getAllActiveItems().subscribe(data => {

            this.requestResult = data;
            if (this.requestResult.success == true) {
                this.allItems = this.requestResult.result;
                //Assign All Items On Items when Page Reload or Refesh
                this.Items = this.allItems;
                this.Items.forEach(obj => {
                    obj.imageUrl = this.defaultImagePath;
                });
                let list1 = this.Items.filter(obj => obj.hasPhoto == true);
                list1.forEach(val => {
                    this.downloadImage(val);
                });
            }
            else {
                this.notification.fail('Error While Importing Items');
            }
        }, err => {
            this.notification.fail('Error While Importing Items');
        });
    }
    // #endregion 

// #region Review Card
    btnReviewCard() {
        this._cd.markForCheck();
        if (this._orderService.OrderItems.length > 0 && this._orderService.OrderItems.length != 0) {
            this._router.navigate(["/cart"]);
        }
        else {
            this._router.navigateByUrl('/orders');
        }
    }

    //#endregion

  //  #region Get Items On Category Id
    getItemsOnCategoryId(itemCategoryId: number) {
        this.selectedCategoryId = itemCategoryId;
        let categoryItems = this.allItems.filter(obj => itemCategoryId == -1 && 1 == 1
            || obj.itemCategoryId == itemCategoryId);// Filter Items on the bases of Items Category Id
        // when filter Assgin to class Base Items Variable
        this.Items = categoryItems;
        this._cd.markForCheck();
        // setting default image here
        this.Items.forEach(obj => {
            obj.imageUrl = this.defaultImagePath;
        });
        let list1 = this.Items.filter(obj => obj.hasPhoto == true);
        list1.forEach(val => {
            this.downloadImage(val);
        });

    }

    // #endregion

    // #region Download Item Image
    downloadImage(itemObj: I_Item) {
        itemObj.imageUrl = this.loadingImage;
        this._itemService.getItemPhoto(itemObj.id)
            .subscribe(data => {
                this.showImageFromBytes(itemObj, data);
                this._cd.markForCheck();
            },
                err => {
                    itemObj.imageUrl = this.errorImagePath;
                    this._cd.markForCheck();
                    // this.imagePath = this.downloadingErrorPath;
                    // this.snackBar.open('Error', 'Problem while downloading the file', { duration: 4000 });
                }
            );
    }

    // #endregion

    showImageFromBytes(itemObj: I_Item, imageBytes) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            itemObj.imageUrl = event.target.result;
        };
        if (imageBytes) {
            reader.readAsDataURL(imageBytes);
        }
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        // for(let column of this.displayedColumns){
        // this.dataSource.filter = column;
        // this.dataSource.filter = filterValue.trim().toLowerCase();
        // }
        /* this.dataSource.filter = filterValue.trim().toLowerCase();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage(); */
    }









}

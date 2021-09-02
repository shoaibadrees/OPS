// import { IPlaceOrder } from './../../shared/models/IPlaceOrder';
import { IOrder } from './../../shared/models/IOrders';

import { TableService } from './../../AddTable/Table.service';
import { IOrderDetail } from 'app/shared/models/IOrderDetail';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OrdersDialogComponent } from '../Orders_Dialog/Orders_Dialog.component';
import { OrderService } from '../order.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { IFormSecurity } from 'app/shared/models/IFormSecurity';
import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
import { CardService } from './Card.service';
import { validateBasis } from '@angular/flex-layout';
import { AppService } from '../../shared/services/app.service';


@Component({
    selector: 'app-Card',
    templateUrl: './Card.component.html',
    styleUrls: ['./Card.component.scss'],
    providers: [CardService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CardComponent implements OnInit {
    // placeOrderObj: IPlaceOrder;
    requestResult: any = null;
    subTotal=0;
    discountPrice : number=0;
    OrderTotalTax :number=0;
    netPrice=0;
    LoadTables: any;// ITableList[];
    orderDetailObj: any;// IOrderDetail[];
    orderObj: IOrder = null;
    totalPrice: number;
  
    form1: FormGroup;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: string;
    dataSource = new MatTableDataSource(this._orderService.OrderItems);
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['Name', 'Description', 'SalePrice', 'ItemQuantity', 'TotalPrice', 'Action'];
    formSecurity: IFormSecurity;
    isAddMode = true;
    constructor(
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService
        , public _orderService: OrderService,
        public _tableService: TableService,
        public _cardService: CardService,
        private appService: AppService,
        public fb: FormBuilder,
        private _cd: ChangeDetectorRef) {
        this.orderObj = this.initObject();
     

    }

    ngOnInit(): void {
        this.createForm();
        this.loadTables();
        this.getSubTotal();
    }

    validation_messages = {
        'tableId': [
            { type: 'required', message: 'Table Name is required' },
        ],


    };
    initObject() {
        {
            var orderObj = {} as IOrder;
            //default values      

            return orderObj;
        }
    }
    //Create Form
    createForm() 
          {
        this.form1 = this.fb.group({
            customerName: [""],
            customerAddress: [""],
            customerPhnNo: [""],
            discount: ["0"],
            tax: ["0"],
            tableId: ["", [Validators.required]],
        });
    }
    private getValuesIntoObject() {
        this.orderObj = this.initObject();
        this.orderObj.id = 0;
        this.orderObj.customerName = this.form1.get('customerName').value;
        this.orderObj.customerAddress = this.form1.get('customerAddress').value;
        this.orderObj.customerPhnNo = this.form1.get('customerPhnNo').value;
         this.orderObj.subTotal=this.subTotal;
        this.orderObj.discount = this.form1.get('discount').value;
        this.orderObj.tax = this.form1.get('tax').value;
        this.orderObj.tableId = this.form1.get('tableId').value;
        this.orderObj.isActive = true;

          this.orderObj.totalPrice= this.netPrice; 
    }
    //Edit Item
    editOrderItem(obj, isEditMode: boolean) {
        this.selectedRowId = obj.Id;
        const dialogref = this.dialog.open(OrdersDialogComponent, {
            height: "auto",
            width: "550px",
            data: { service: this._orderService, selectedObj: obj, editMode: isEditMode }
        })
        dialogref.afterClosed().subscribe(result => {
            let isOk: boolean = (result == undefined) ? false : result;
            if (isOk) {
                this._cd.markForCheck();
                this.dataSource = new MatTableDataSource(this._orderService.OrderItems);
                this.notification.success('Succcessfully Updated Item!')
                this._cd.markForCheck();
            }
            else if (isOk == undefined)
            {
                this.selectedRowId = null;
                this._cd.markForCheck();
            }
        });
    }
    //Load Hotel Tables
    loadTables() {
        this._tableService.getAllTablesOnActive().subscribe(
            tables => {
                this.requestResult = tables;
                
                if (this.requestResult.success == true) {
                    this.LoadTables = this.requestResult.result;
                    this._cd.markForCheck();
                }
            }, err => {
                this.notification.fail('Error While Importing the Tables');
                this._cd.markForCheck();
            }

        );

    }
    AddItems() {
        this._router.navigate(["/orders"]);
    }

    deleteItem(obj) {
        if (obj) {
            this._orderService.OrderItems.splice(obj, 1);
            this.notification.success('Successfully Remove the Order Items');
            this.dataSource = new MatTableDataSource(this._orderService.OrderItems);
            this._cd.markForCheck();
        }
        if (this._orderService.OrderItems.length == 0) {
            this._router.navigate(['/orders']);

        }

    }

    btnPlaceOrder() {
        this.getValuesIntoObject();
        this._cardService.placeOrder(this._orderService.OrderItems, this.orderObj)
            .subscribe(data => {
                this.requestResult = data;
                if (this.requestResult.result == true) {
                    this.notification.success('Your Order Successfully Placed');
                    this.dataSource = null;
                    this._router.navigate(['/orders']);
                    
                }

        }, err => {

                    this.notification.fail('Error While Order Placed');
                    this._cd.markForCheck();
        });

    }

    getSubTotal() {
        debugger;
        for (let i = 0; i <= this._orderService.OrderItems.length; i++) {
            debugger;
            let quantity = this._orderService.OrderItems[i].itemQuatity;
           let salePrice= this._orderService.OrderItems[i].salePrice;
            this.subTotal = (quantity)* (salePrice)+ this.subTotal;
            this.netPrice= this.subTotal;
        }
    }

discount(event: Event)
    {

 let discountValue = (event.target as HTMLInputElement).value;
 if(discountValue=="")
 {
    debugger;
     this.netPrice=this.subTotal;
     this.discountPrice= 0;
     return;
 }
 else{
     debugger;
     var discPrice = parseInt(discountValue);//2
     this.netPrice = (this.subTotal) - (discPrice);
        this.discountPrice=  discPrice;
        return;
 }
 
    }

//tax(event: Event)
//{
//    debugger;
// let taxValue = (event.target as HTMLInputElement).value;
// var tax = parseInt(taxValue);
// if(taxValue=="")
// {
//     this.netPrice= this.subTotal;
//     this.OrderTotalTax=0;
//     return;
// }
// else
// {
//     debugger;
//     this.OrderTotalTax=0;
//     this.OrderTotalTax= tax;
//     this.netPrice= this.netPrice-tax;
//     return;
// }
//}


}
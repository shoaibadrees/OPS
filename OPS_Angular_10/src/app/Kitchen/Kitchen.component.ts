
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
import { KitchenService } from './Kitchen.Service';
import { KitchenDialogComponent } from './Kitchen-dialog/Kitchen-dialog.component';
import { IOrder } from '../shared/models/IOrders';
import { AppService } from '../shared/services/app.service';

@Component({
    selector: 'app-table-list',
    templateUrl: './Kitchen.component.html',
    styleUrls: ['./Kitchen.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class KitchenComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: string;
    requestResult: any = null;
    dataSource: MatTableDataSource<IOrder> = new MatTableDataSource();
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['TableName', 'CustomerName', 'orderStatus', 'isActive', 'Action'];
    formSecurity: IFormSecurity;
    isAddMode = true;
    orderStatusList = [];

    constructor(
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService,
        public _kitchenService: KitchenService,
        private appService: AppService,
        private _cd: ChangeDetectorRef) {

        this.orderStatusList = this.appService.orderStatusList;

    }

    ngOnInit(): void {
        this.refreshGrid();
    }
    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator
    }
    refreshGrid(): void {
        this.isGridDataLoading = true;
        this._kitchenService.getAllActiveOrders()
            .subscribe(data1 => {
                this.requestResult = data1;

                if (this.requestResult.success == true) {
                    this.dataSource = new MatTableDataSource(this.requestResult.result);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                }
                else {
                    this._cd.markForCheck();
                    this.notification.fail('Error While Importing the Orders');
                }
            },
                err => {
                    this.isGridDataLoading = false;
                    console.log(err);
                }
            );
    }

    ReviewOrderDetail(obj: IOrder) {
        debugger;
        const dialogRef = this.dialog.open(KitchenDialogComponent, {
            panelClass: 'custom1-dialog-container',
            width: '800px',
            height: '700px',
            data: {
                orderId: obj.id,
                orderStatus: obj.orderStatus
                , service: this._kitchenService
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            let isOk: boolean = (result == undefined) ? false : result;
            if (isOk) {

                this.notification.success('Order Successfully Prepare!')
                this.refreshGrid();
                this.selectedRowId = null;
            }
            else if (isOk == undefined) {
                this.isGridDataLoading = null;
                this.selectedRowId = null;


            }

        });
        err => {
            console.log(err);
        }



    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        debugger;
        // for(let column of this.displayedColumns){
        // this.dataSource.filter = column;
        // this.dataSource.filter = filterValue.trim().toLowerCase();
        // }
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


}


















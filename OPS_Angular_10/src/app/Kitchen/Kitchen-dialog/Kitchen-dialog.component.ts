
import { KitchenService } from './../Kitchen.Service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../Services/notification.service';
import { AppService } from '../../shared/services/app.service';
import { IOrderDetail } from '../../shared/models/IOrderDetail';
import { IOrder } from '../../shared/models/IOrders';

@Component({
    selector: 'app-department-dialog',
    templateUrl: './Kitchen-dialog.component.html',
    styleUrls: ['./Kitchen-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})


export class KitchenDialogComponent implements OnInit {
    orderId: number;
    private _route: ActivatedRoute;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
   // selectedRowId: number;
    studentID: number = 0;
    dataSource: MatTableDataSource<IOrderDetail> = new MatTableDataSource();
    isGridDataLoading: boolean;
    classObj: IOrderDetail = null;
    displayedColumns: string[] = ['ItemName', 'Quantity'];
    orderStatusList = [];
   
    
    requestResult: any = null;
    selectedOrderStatus: string;
    constructor(
        private _httpClient: HttpClient,
        public dialogRef: MatDialogRef<KitchenDialogComponent>,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private notification: NotificationService,
        private _kitchenService: KitchenService,
        private appService: AppService,
        private _cd: ChangeDetectorRef)
    {
        
        this.selectedOrderStatus = data.orderStatus;
        this.orderStatusList = this.appService.orderStatusList;
        this.classObj = this.initObj();
        if (this.data == null) {
            this.notification.info('No Record Found');
        }
        if (this.data != null) {
            
            this.orderId = this.data.orderId;
           
        }


    }

    ngOnInit(): void {
       // this.selectedOrderStatus = this.data.orderStatus;
        this._cd.markForCheck();
        this.getOrderDetails();
    }

    refreshGrid(): void {
        this.isGridDataLoading = true;
        this._kitchenService.getOrderDetailOnId(this.orderId)
            .subscribe(data1 => {
             //   this.selectedRowId = null;
                this.dataSource = new MatTableDataSource(data1);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.isGridDataLoading = false;
               
              //  this.selectedRowId = null;
                this._cd.markForCheck();

            },
                err => {
                  
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                    console.log(err);
                }
            );

    }
    initObj(): IOrderDetail {
        var obj = {} as IOrderDetail;
        // obj.StudentID = 0;
        return obj;
    }

    getOrderDetails() {
       
        if (this.orderId != null) {
            this._kitchenService.getOrderDetailOnId(this.orderId).subscribe(data1 => {
                if (data1) {
                 
                   
                    this.dataSource = new MatTableDataSource(data1.result);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                }
            },
                err => {
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                    
                }
            );

        }
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    OrderStatus(orderStatus: string) {
        this.selectedOrderStatus = orderStatus;
     
    }

    btnUpdateStatus() {

        this._kitchenService.updateOrderStatus(this.orderId, this.selectedOrderStatus).subscribe(data => {
            this.requestResult = data;
            if (this.requestResult.result == true) {
                this.dialogRef.close(true);
            }
        });
    }
           
}



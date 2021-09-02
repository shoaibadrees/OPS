import { TableService } from './Table.service';
import { ITableList } from './../shared/models/ITable-List';
import { TableDialogComponent } from './Table-dialog/Table-dialog.component';



import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../Services/notification.service';

import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-Table',
    templateUrl: './Table.component.html',
    styleUrls: ['./Table.component.scss'],
    providers: [TableService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: string;
    dataSource: MatTableDataSource<ITableList> = new MatTableDataSource();
    requestResult: any = null;
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['Title', 'Description', 'isActive', 'Action'];
    isAddMode = true;
    constructor(private classService: TableService,
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService,

        private _cd: ChangeDetectorRef) {


    }

    ngOnInit(): void {
        this.refreshGrid();
    }
    refreshGrid(): void {
        this.isGridDataLoading = true;
        this.classService.getAllTables()
            .subscribe(data1 => {
               
                this.requestResult = data1;
                if (this.requestResult.success == true && this.requestResult.result!=null) {
                    this.dataSource = new MatTableDataSource(this.requestResult.result);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();

                }
            },
                err => {
                    this._cd.markForCheck();
                    this.notification.fail('Error While Importing the Tables');
                    this.isGridDataLoading = false;
                    
                }

            );
    }
    AddTable() {
        const dialogRef = this.dialog.open(TableDialogComponent, {
            height: "450px",
            width: "550px",
            data: null,
            panelClass: 'custom1-dialog-container',
        });
        dialogRef.afterClosed().subscribe(result => {
            let isOk: boolean = (result == undefined) ? false : result;
            if (isOk) {
                this.notification.success(' Table Succcessfully Inserted!')
                this.refreshGrid();
                this.selectedRowId = null;
                this._cd.markForCheck();
            }
            else if (isOk == undefined) {
                this.refreshGrid();
                this.selectedRowId = null;
                this._cd.markForCheck();

            }

        });

    }

    editTable(obj: ITableList, iseditMode: boolean): void {
        this.selectedRowId = obj.id;
        const dialogRef = this.dialog.open(TableDialogComponent,
            {
                panelClass: 'custom1-dialog-container',
                disableClose: false,
                height: "650px",
                width: "650px",
                data: {
                    obj: obj
                    , service: this.classService, isEditMode: iseditMode
                }
            });

        dialogRef.afterClosed().subscribe(result => {
            let isOk: boolean = (result == undefined) ? false : result;
            if (isOk) {
                
                this.notification.success(' Table Succcessfully Updated!');
                this.refreshGrid();
                this.selectedRowId = null;
            }
            else if (isOk == undefined) {
                this._cd.markForCheck();
                this.selectedRowId = null;
                this.refreshGrid();
            }
        });
        err => {
            console.log(err);
        }
    }
    deleteTable(tableid: number) {
        if (tableid != null) {
            this.classService.deleteTable(tableid).subscribe(result => {
                this.requestResult = result;
                if (this.requestResult.result==true) {
                    this.notification.success('Table Successfully Deleted');
                    this.refreshGrid();
                }
                else {

                    this.notification.fail('Error While Deleted The Table');
                    this.refreshGrid();
                }
            }, err => {

                this.notification.fail('Error While Deleted The Table');
                this.refreshGrid();
            });

        }
        else {
            this.notification.showNotification('Dont Have Table');
        }

    }
}





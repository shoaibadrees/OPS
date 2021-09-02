
import { ITableList } from './../shared/models/ITable-List';
import { UnitDialogComponent } from './Units-dialog/Units-dialog.component';
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
import { UnitsService } from './Units.service';

@Component({
  selector: 'app-Units',
  templateUrl: './Units.component.html',
  styleUrls: ['./Units.component.scss'],
    providers: [UnitsService], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UnitComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRowId: string;

dataSource: MatTableDataSource<ITableList>=new MatTableDataSource();

  isGridDataLoading : boolean;
  displayedColumns: string[] = ['Title','Description' ,'isActive','Action'];
isAddMode=true;
  constructor(private classService: UnitsService,
    private _httpClient: HttpClient, public dialog: MatDialog,private _router: Router
    ,private notification : NotificationService,
     
     private _cd: ChangeDetectorRef ) {


     }

ngOnInit(): void {
  this.refreshGrid();
}
   refreshGrid(): void{
    this.isGridDataLoading = true;
    this.classService.getAllTables()
            .subscribe(data1 => {
              if(data1!=null){
                var result= data1.result;
              this.dataSource = new MatTableDataSource(result);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.isGridDataLoading = false;

              }  },
              err => {
                this.isGridDataLoading = false;
                console.log(err);
              }
            
            );
  }
AddTable()
{
 const dialogRef = this.dialog.open(UnitDialogComponent, {
      height: "450px",
      width: "550px",
      data : null,
      panelClass: 'custom1-dialog-container',
    });
    dialogRef.afterClosed().subscribe(result => {
      let isOk: boolean = (result == undefined) ? false : result;
      if (isOk) {
        console.log(isOk);
        this.notification.success('Succcessfully Inserted!')
        this.refreshGrid();    
     }
      
    });

  }
  
   editTable(obj: ITableList, isAddMode: boolean): void 
   {
    this.selectedRowId = obj.id;
      const dialogRef = this.dialog.open(UnitDialogComponent,
        {
          panelClass: 'custom1-dialog-container',
        disableClose:false,
        height: "450px",
        width: "550px",
        data : {obj: obj
          , service: this.classService,isAddMode: isAddMode}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        let isOk: boolean = (result == undefined) ? false : result;
        if (isOk) {
         
          this.notification.success('Succcessfully Updated!');
          console.log('Updated')
          this.refreshGrid();
          
        console.log("The dialog was closed");
      }
      });
      err=>{
        console.log(err);
      }
  }
deleteTable(tableid: number)
    {
if(tableid!=null)
{
  this.classService.deleteTable(tableid).subscribe(result=>
    {
      if(result)
      {
        this.notification.success('Successfully Deleted Table');
                  this.refreshGrid();
      }
      else{
       
            this.notification.fail('Error While Deleted The Table');
            this.refreshGrid();
          }
    },err=>{
          
          this.notification.fail('Error While Deleted The Table');
          this.refreshGrid();
  });
    
}
    else
    {
      this.notification.showNotification('Dont Have Table');
    }

    }
}





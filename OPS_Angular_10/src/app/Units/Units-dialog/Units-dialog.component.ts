
import { ITableList } from './../../shared/models/ITable-List';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../Services/notification.service';
import { AppService } from '../../shared/services/app.service'; 
import { UnitsService } from '../Units.service';

@Component({
  selector: 'app-Units-dialog',
  templateUrl: './Units-dialog.component.html',
  styleUrls: ['./Units-dialog.component.scss'],
})
export class UnitDialogComponent implements OnInit {
  isAddMode: boolean;
form1: FormGroup;
title : string;
classObj: ITableList =null;
validation_messages = {
 
  'Title': [
    { type: 'required', message: 'Name  is required' },
  ],
    'Description': [
    { type: 'required', message: ' Description is required' },
  ]
};

  constructor(
    public dialogRef: MatDialogRef<UnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,private service:UnitsService,
    private notification : NotificationService) { 
      this.classObj = this.initObject();
      if(this.data == null){ 
      }
      if (data != null) {
      
        this.classObj = data.obj;
        this.service = data.service;
        this.isAddMode= data.isAddMode;
        // console.log(this.service);        
      }
      else
      {
      
        this.isAddMode= false;
      }
    }

  ngOnInit(): void {
    this.createForm();
    this.setFormValues(this.classObj);
  }


  createForm(){
    this.form1 = this.fb.group({
        Id: [{value:null, disabled: true},],
        Title: ["", [Validators.required]],
        Description: [""],
        isActive: ["False"],

      });
  }

  setFormValues(obj: ITableList){
    this.form1.patchValue({
        Id: obj.id,
        Title:  obj.title,
        Description: obj.description,
        isActive: obj.isActive
    });
  }

    //update Record
    initObject() {
      {
        var obj = {} as ITableList;
        //default values      
  
        return obj;
      }
    }
    private getValuesIntoObject() {
      debugger;
      this.classObj.id = this.form1.get('Id').value;
      this.classObj.title = this.form1.get('Title').value;
      this.classObj.description = this.form1.get('Description').value;
        this.classObj.isActive = this.form1.get('isActive').value;
    }
    saveTable() {
      debugger;
      this.getValuesIntoObject();
      debugger;
      this.service.updateOrInsertTable(this.classObj)
        .subscribe(data => {
          if (data) {
            //this.data.isOK = true;
            this.dialogRef.close(true);
            
          } else {
            console.log('Problem while saving the record');
          }
  
        },
        err => {
          console.log(err);

          
        }
        );
  
    }
    
     

}

import { Router } from '@angular/router';
import { I_ItemCategory } from './../../shared/models/I_ItemCategory';
import { ItemsService } from './../Item.service';

import { I_Item } from './../../shared/models/I_Item';
import { NotificationService } from '../../Services/notification.service';

import { Component, Inject, NgZone, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../shared/services/app.service';


@Component({
  selector: 'app-Item-dialog',
  templateUrl: './Item-dialog.component.html',
  styleUrls: ['./Item-dialog.component.scss'],
    providers: [ItemsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDialogComponent implements OnInit {
  requestResult: any;
itemId: number=0;
itemPhoto: File=null;
fileToUpload: FileList;


emptyImagePath: any ='./assets/img/item_default.png';
errorImagePath: any ='./assets/img/item_error.png'
loadingImage = './assets/img/item_loading.png';
//imageUrl1: any =this.loadingImage;
imageUrl: any =this.emptyImagePath;  //Upload Image Url

isEditMode: boolean;
LoadCategoryItems: I_ItemCategory[]=null;
form1: FormGroup;
title : string;
itemObj: I_Item =null;
validation_messages = {
 
  'title': [
    { type: 'required', message: ' Item Name  is Required' },
  ],
    'itemCategory': [
    { type: 'required', message: ' Item Category is Required' },

  ],
  'salePrice': [
    { type: 'required', message: ' Item Sale Price is Required' },
  
  ]
};

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,private appService: AppService,
    private _itemService:ItemsService,
     private _router: Router,
    private notification : NotificationService,
      private el: ElementRef,
      private _cd: ChangeDetectorRef) { 
      this.itemObj = this.initObject();
      if(this.data == null){ 
      }
      if (data != null) {
        this.itemObj = data.obj;
        this.itemId= data.obj.id;
        this._itemService = data.service;
        this.isEditMode= data.isEditMode;
              
      }
      else
      {
      
        this.isEditMode= false;
        this.itemId=0;
      }
    }

  ngOnInit(): void {
    this.createForm();
    this.loadActiveCategoryItems();
   this.getItemInfo();
  
    }

loadActiveCategoryItems()
{
this._itemService.getActiveCategoryItems().subscribe(data=>
  {
    if(data) {

        this.LoadCategoryItems = data.result;
        this._cd.markForCheck();
                }
}, err => {
        this._cd.markForCheck();
                this.notification.fail('Error While Importing the Category Items');
            }

        );
    }

getItemInfo(){
 if  (this.itemId>0){ 
    
    this._itemService.getItemOnId(this.itemId).subscribe(data=>
  {
    this.requestResult= data;
        this.itemObj = this.requestResult.result[0];
        this._cd.markForCheck();
        this.setFormValues(this.itemObj);
        
        if(this.itemObj.hasPhoto)
        {
          this.downloadImage();
        } 
  },
  err=>
  {
      this.notification.fail(err);
  });   
  }
  else {
    this._router.navigate(['/Item']);
  }
    }

    downloadImage() {
 
 this.imageUrl =this.loadingImage;
  this._itemService.getItemPhoto(this.itemId)
    .subscribe(data => {
        this.showImageFromBytes(data);
        
    },
        err => {
        
        this.imageUrl= this.errorImagePath;
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
  createForm()
  {
    this.form1 = this.fb.group({
        itemtitle: ["",[Validators.required]],
        description: [""],
        salePrice: ["",[Validators.required]],
        saleTaxPrice: [""],
        isActive: [""],
        itemCategoryId: ["",[Validators.required]],
        image: [""],
      });
  }

  //Set Form Values
  setFormValues(obj: I_Item){
    this.form1.patchValue({
        itemtitle:  obj.title,
        description: obj.description,
        salePrice: obj.salePrice,
         saleTaxPrice: obj.saleTaxPrice,
        isActive: obj.isActive,
        itemCategoryId: obj.itemCategoryId,
        image: obj.image

    });
  }

   //Initialiaze Object
    initObject() {
      {
        var obj = {} as I_Item;
        //default values      
  
        return obj;
      }
    }
    //Get Form Values in Object
    private getValuesIntoObject() 
    {
 
      if(this.itemId==null)
      {
      this.itemObj.id= 0;
      }
      else
      {
        this.itemObj.id= this.itemObj.id;
        }
        debugger;
      this.itemObj.title = this.form1.get('itemtitle').value;
      this.itemObj.description = this.form1.get('description').value;
        this.itemObj.salePrice = this.form1.get('salePrice').value;
      this.itemObj.saleTaxPrice= this.form1.get('saleTaxPrice').value;
     // this.itemObj.isSpecialOffer= this.form1.get(('isSpecialOffer')).value;
        this.itemObj.itemCategoryId = this.form1.get('itemCategoryId').value;
        if (this.form1.get('isActive').value == "" ) {
            this.itemObj.isActive = false;
        }
        else {
            this.itemObj.isActive = this.form1.get('isActive').value;
        }
  
       this.itemObj.image=this.form1.get('image').value;
    }



    
uploadPhoto(file: FileList) {

 this.fileToUpload = null;

  if(file && file[0])
  {
   // photo = file[0];
    this.imageUrl = file[0];
    this.fileToUpload = file;
  }
  else {
     return; 
    }
       if(this.itemId>0 )
       {
            const formData = new FormData();
            formData.append('ItemImage',  this.imageUrl, this.imageUrl.name);
            formData.set("ItemId",this.itemId.toString());
            this._itemService.saveItemPhoto(formData).subscribe(data=>{
                this.requestResult = data;
                this._cd.markForCheck();
                if( this.requestResult.success==true)
                {
                  this.itemObj.hasPhoto=true;
                  this.downloadImage(); 
                    this._cd.markForCheck();
                }
            });
       }
       else
       {
           
          this.displayImage(file);
       }
}
 

displayImage(file : FileList){
  
 this.imageUrl =file[0];
 const reader = new FileReader();
 reader.onload= (event:any)=>{
   
     this.imageUrl = event.target.result;
     this._cd.markForCheck();
 };

 if(file){
   reader.readAsDataURL(this.imageUrl);
 } 

}

private validateForm(): boolean {
  this.form1.markAllAsTouched();
  return this.form1.valid;
 }
 // Save Item
 saveItem(){ 
  if(!this.validateForm()){
    this.notification.fail("Please Fill all the required Field");
    //focus on errror fields 
    for (const key of Object.keys(this.form1.controls)) {
      if (this.form1.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname =' + key + ']');
        invalidControl.focus();
        break;
     }
  }
    return;
  }
   /* const chkImage = this.form1.get('Photograph').value;
    if(this.itemObj.id==0){
      
      if(chkImage == null || chkImage == undefined || chkImage == '')
      {
        this.notification.fail("Please Upload Image");
        return ;
      }
    } */
    //this.classObject.HasPhoto=true;
    
    this.getValuesIntoObject();
     let id = this.itemObj.id;
     debugger;
      this._itemService.updateOrInsertItem(this.itemObj).subscribe(data=>{
        this.requestResult= data;
        if( this.requestResult.success=true){
              this.itemId= this.requestResult.result;
              //Insert Case
            if (this.fileToUpload != null && id == undefined)
              {
                  this.uploadPhoto( this.fileToUpload);
              }
              this.dialogRef.close(true);
               

        } else {
            
            this.notification.fail("Error While Save the Item  Images");
          }
      },
          err => {
              
        console.log("error in inserting Item");
      }
      );
   
  } 

btnCancelImage()
{
    
  if(this.itemId==0 || this.itemId==null || this.itemId==undefined)
  {
  this.imageUrl= this.emptyImagePath;
  this.fileToUpload=null;
  }
  else{
  this._itemService.cancelItemPhoto(this.itemId).subscribe(data=>{
  
   this.requestResult= data;
  this.imageUrl= this.emptyImagePath;
      this.fileToUpload = null;
      
},)
  }
}

}

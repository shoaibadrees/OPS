import { IOrderDetail } from 'app/shared/models/IOrderDetail'; 
import { IOrderItem } from '../shared/models/IOrderItems';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

OrderItems: IOrderDetail[]=[];//Order Item Details in this array
  public orderList: IOrderItem[] = [
    {id:1, title:'chicken1',description:'Chicken kabab with reglar Bottle',salePrice:675,isSpecialOffer:true }
    ,{id:2, title:'chicken2',description:'Chicken biryani with reglar Bottle',salePrice:32,isSpecialOffer:true }
    ,{id:3, title:'chicken3',description:'Chicken shuwarma with reglar Bottle',salePrice:422,isSpecialOffer:true }
    ,{id:4, title:'chicken4',description:'Chicken burger with reglar Bottle',salePrice:33,isSpecialOffer:true }
    ,{id:5, title:'chicken5',description:'Chicken Salad with reglar Bottle',salePrice:34,isSpecialOffer:true }
    ,{id:6, title:'chicken6',description:'Chicken food with reglar Bottle',salePrice:3232,isSpecialOffer:true }
    ,{id:7, title:'chicken7',description:'Chicken yakhni with reglar Bottle',salePrice:343,isSpecialOffer:true }
  ];
public foodCategory=[{id:1, name:'BreakFast'},
  {id:1, name:'Lunch'},
  {id:2, name:'Dinner'},
  {id:4, name:'FastFood'}
  ];

}

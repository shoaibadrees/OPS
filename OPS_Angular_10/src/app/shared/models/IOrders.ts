import { IOrderDetail } from "./IOrderDetail"; 

export interface IOrder {
    id: number;
    customerName: string;
    customerAddress: string;
    customerEmail: string;
    orderStatus: string;
    customerPhnNo: string;
    subTotal: number;
    discount:number;
    tax: number;
    totalPrice: number;
    tableId: number;
    isActive: boolean;
    orderDetail: IOrderDetail[]

  }




  
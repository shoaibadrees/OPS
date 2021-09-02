import { UnitComponent } from './../../Units/Units.component';
import { ItemCategoryComponent } from './../../ItemCategory/ItemCategory.component';
import { EmployeeComponent } from './../../Employee/Employee.component';
import { CardComponent } from '../../orders/Card/Cardcomponent';
import { OrdersComponent } from './../../orders/orders.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { KitchenComponent } from '../..//Kitchen/Kitchen.component';
import { TableComponent } from '../..//AddTable/Table.component';
import { ItemComponent } from 'app/AddItem/Item.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'orders', component: OrdersComponent },
    { path: 'Employee', component: EmployeeComponent },
    { path: 'Item', component: ItemComponent },
    { path: 'ItemCategory', component: ItemCategoryComponent },
    { path: 'cart', component: CardComponent },
    { path: 'Table', component: TableComponent },
    { path: 'Kitchen', component: KitchenComponent },
    {
      path: 'Unit', component: UnitComponent
    },
    { path: 'dashboard', component: DashboardComponent },
   
];




import { Component, OnInit } from '@angular/core';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/Employee', title: 'Employee',  icon: 'person', class: '' },
    { path: '/ItemCategory', title: 'Item Category', icon: 'dashboard', class: '' },
    { path: '/Item', title: 'Item', icon: 'menu_book', class: '' },
    { path: '/orders', title: 'Orders', icon: 'restaurant_menu', class: '' },
    { path: '/Kitchen', title: 'Kitchen', icon: 'kitchen', class: '' },
    { path: '/Table', title: 'Table', icon: 'table_restaurant', class: '' },
//    { path: '/Unit', title: 'Unit', icon: 'ad_units', class: '' },

   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

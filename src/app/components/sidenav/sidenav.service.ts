import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  selectedIndex: number = 0;
  menuItems = [
    { icon: 'home', name: 'Home', route: '/home' },
    { icon: 'report', name: 'Reports', route: '/reports' },
    { icon: 'inventory', name: 'Inventory', route: '/inventory' },
    { icon: 'receipt_long', name: 'Billing', route: '/billing' },
    { icon: 'person', name: 'Profile', route: '/profile' },
  ];

  setIndexByRoute(route: string) {
    const index = this.menuItems.findIndex((item) => item.route === route);
    if (index > -1) {
      this.selectedIndex = index;
    }
  }
}

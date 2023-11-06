import { Component, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  get selectedIndex() {
    return this.sidenavService.selectedIndex;
  }
  menuItems = [
    { icon: 'home', name: 'Home', route: '/home' },
    { icon: 'report', name: 'Reports', route: '/reports' },
    { icon: 'inventory', name: 'Inventory', route: '/inventory' },
    { icon: 'receipt_long', name: 'Billing', route: '/billing' },
    { icon: 'person', name: 'Profile', route: '/profile' },
  ];

  constructor(
    private router: Router,
    private zone: NgZone,
    private sidenavService: SidenavService
  ) {}

  navigateTo(route: string, index: number) {
    this.zone.run(() => {
      this.sidenavService.selectedIndex = index;
    });
    this.router.navigate([route]);
  }

  ngOnInit() {
    const currentRoute = this.router.url; // this will give you the current route

    // Find the index of the menu item with the current route
    this.sidenavService.selectedIndex = this.menuItems.findIndex(
      (item) => item.route === currentRoute
    );
  }
}

import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from '../sidenav/sidenav.service';
import { UserService } from 'src/app/services/User/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: any;
  userSubscription!: Subscription;

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
    private sidenavService: SidenavService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser.subscribe(
      (user) => (this.currentUser = user)
    );
    const profileIndex = this.menuItems.findIndex(
      (item) => item.name === 'Profile'
    );
    this.sidenavService.selectedIndex = profileIndex;
  }

  navigateTo(route: string, index?: number) {
    if (index !== undefined) {
      this.zone.run(() => {
        this.sidenavService.selectedIndex = index;
      });
    }
    this.router.navigate([route]);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

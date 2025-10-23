import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarButtonComponent } from '../../../shared/components/UI/sidebar-button/sidebar-button.component';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  private readonly _Router = inject(Router);
  routerEventID!: Subscription;
  currentUrl = '';
  isSidebarOpen = false;
  isSearchOpen = false;

  ngOnInit(): void {
    this.currentUrl = this._Router.url;
    this.routerEventID = this._Router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl = event.urlAfterRedirects;
        this.closeAll();
      });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    document.body.classList.toggle('overflow-hidden', this.isSidebarOpen);
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    document.body.classList.toggle('overflow-hidden', this.isSearchOpen);
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  closeSearch() {
    this.isSearchOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  closeAll() {
    this.isSidebarOpen = false;
    this.isSearchOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  logOut() {
    sessionStorage.clear();
    this.closeAll();
    this._Router.navigate(['/signin']);
  }

  ngOnDestroy() {
    this.routerEventID?.unsubscribe();
  }
}

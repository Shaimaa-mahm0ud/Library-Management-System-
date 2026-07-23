import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  darkMode = false;
  showProfile = false;
  mobileMenu = false;
  showNavbar = true;

  userName: string = 'User';
  userRole: string = 'user';

  private loginPath = '/login'; 
  private registerPath = '/register';
  private profilePath = '/profile';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkRoute(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkRoute(event.urlAfterRedirects || event.url);
    });

    this.loadUserData();
  }

  checkRoute(url: string) {
    if (url.includes(this.loginPath) || url.includes(this.registerPath)) {
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
    }
  }

  loadUserData() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.userName = user.name || 'User';
        this.userRole = user.role || 'user';
      } catch (e) {
        this.userName = 'User';
        this.userRole = 'user';
      }
    }
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    return name.trim().charAt(0).toUpperCase();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-theme');
    document.documentElement.classList.toggle('dark');
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  toggleMenu() {
    this.mobileMenu = !this.mobileMenu;
  }

  @HostListener('document:click')
  closeMenus() {
    this.showProfile = false;
    this.mobileMenu = false;
  }

  goToProfile() {
    this.closeMenus();
    this.router.navigate([this.profilePath]);
  }

  logout() {
    this.closeMenus();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate([this.loginPath]);
  }}
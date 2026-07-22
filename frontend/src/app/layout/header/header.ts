import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  darkMode = false;

  showProfile = false;

  showNotifications = false;

  toggleDarkMode() {

    this.darkMode = !this.darkMode;

    document.body.classList.toggle('dark');

  }

  toggleProfile() {

    this.showProfile = !this.showProfile;

    this.showNotifications = false;

  }

  toggleNotifications() {

    this.showNotifications = !this.showNotifications;

    this.showProfile = false;

  }

 @HostListener('document:click')
closeMenus(){

  this.showProfile = false;
  this.showNotifications = false;
  this.mobileMenu = false;

}
  mobileMenu = false;

toggleMenu(){

  this.mobileMenu = !this.mobileMenu;

}

}
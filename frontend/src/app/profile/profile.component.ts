import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  stats = { borrowed: 0, active: 0, returned: 0, overdue: 0 };
  recentActivity: any[] = [];
  
  editMode: boolean = false;
  darkMode: boolean = false;
  emailNotifications: boolean = true;
  pushNotifications: boolean = false;
  
  nameInput: string = '';
  emailInput: string = '';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.fetchProfileData();
  }

  fetchProfileData(): void {
    const token = localStorage.getItem('token'); 

    if (!token) {
      console.warn('No token found, redirecting to login...');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://localhost:5000/auth/profile', { headers }).subscribe({
      next: (res) => {
        console.log('Data received from DB:', res);

        // ربط مباشر للـ user والـ stats
        this.user = res.user ? res.user : res; 
        this.stats = res.stats ? res.stats : this.stats;
        this.recentActivity = res.recentActivity || [];
        
        this.nameInput = this.user?.name || '';
        this.emailInput = this.user?.email || '';
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching profile from DB:', err);
        if (err.status === 401 || err.status === 403) {
          alert('Session expired, please login again.');
          this.logout();
        }
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.nameInput = this.user?.name || '';
      this.emailInput = this.user?.email || '';
    }
  }

  saveProfile(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.put<any>('http://localhost:5000/auth/updateprofile', {
      name: this.nameInput,
      email: this.emailInput
    }, { headers }).subscribe({
      next: (res) => {
        this.user = res.user ? res.user : res;
        this.nameInput = this.user?.name || '';
        this.emailInput = this.user?.email || '';
        this.editMode = false;
        
        this.cdr.detectChanges();
        alert('Profile updated in Database successfully!');
      },
      error: (err) => console.error('Error updating profile in DB:', err)
    });
  }

  toggleDarkMode(): void {
  this.darkMode = !this.darkMode;
  if (this.darkMode) {
    document.body.classList.add('dark-theme');
    document.documentElement.classList.add('dark');
  } else {
    document.body.classList.remove('dark-theme');
    document.documentElement.classList.remove('dark');
  }
}

  navigateToMyBooks(): void {
    this.router.navigate(['/my-books']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
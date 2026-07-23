import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!token) {
    alert('Please login first.');
    router.navigate(['/login']);
    return false;
  }

  if (user?.role !== 'admin') {
    alert('You are not authorized to access the admin panel.');
    router.navigate(['/book']);
    return false;
  }

  return true;
};

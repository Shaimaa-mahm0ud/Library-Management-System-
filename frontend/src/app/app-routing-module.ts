import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { MyBooks } from './pages/my-books/my-books';
import { ProfileComponent } from './pages/profile/profile';
import { AdminBooks } from './pages/admin/admin-books/admin-books';
import { AddBook } from './pages/admin/add-book/add-book';
import { EditBook } from './pages/admin/edit-book/edit-book';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { BookComponent } from './pages/book/book';

import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: 'my-books',
    component: MyBooks,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: Dashboard,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/books',
    component: AdminBooks,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/add-book',
    component: AddBook,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/edit-book/:id',
    component: EditBook,
    canActivate: [adminGuard]
  },
  {
    path: 'book',
    component: BookComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
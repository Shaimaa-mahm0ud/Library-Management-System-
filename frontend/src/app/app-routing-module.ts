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

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: Home
  },
  {
    path: 'my-books',
    component: MyBooks
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'admin',
    component: AdminBooks
  },
  {
    path: 'add-book',
    component: AddBook
  },
  {
    path: 'edit-book/:id',
    component: EditBook
  }
];

@NgModule({

  imports:[RouterModule.forRoot(routes)],

  exports:[RouterModule]

})

export class AppRoutingModule{}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { MyBooks } from './pages/my-books/my-books';
import { ProfileComponent } from './pages/profile/profile';

const routes: Routes = [
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
  }
];

@NgModule({

  imports:[RouterModule.forRoot(routes)],

  exports:[RouterModule]

})

export class AppRoutingModule{}
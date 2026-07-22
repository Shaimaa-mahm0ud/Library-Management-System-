import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MyBooks } from './pages/my-books/my-books';
import { Layout } from './layout/layout';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Home } from './pages/home/home';
import { ProfileComponent } from './pages/profile/profile';
import { AddBook } from './pages/admin/add-book/add-book';
import { EditBook } from './pages/admin/edit-book/edit-book';
import { AdminBooks } from './pages/admin/admin-books/admin-books';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    App,
    MyBooks,
    Layout,
    Header,
    Footer,
    Home,
    ProfileComponent,
    AddBook,
    EditBook,
    AdminBooks,
    Dashboard,
    RegisterComponent,
    LoginComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}

import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MyBooks } from './pages/my-books/my-books';
import { Layout } from './layout/layout';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Home } from './pages/home/home';
import { ProfileComponent } from './pages/profile/profile';

@NgModule({
  declarations: [App, MyBooks, Layout, Header, Footer, Home, ProfileComponent],
  imports: [BrowserModule, AppRoutingModule,FormsModule,
  HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}

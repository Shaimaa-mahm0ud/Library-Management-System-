import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { AuthResponse } from '../models/auth-response';

const API_URL = 'http://localhost:5000';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}
    login(data: Login): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(API_URL + '/api/auth/login', data);
    }
    register(data: Register): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(API_URL + '/api/auth/register', data);
    }
    forgotPassword(email: string): Observable<any> {
        return this.http.post<any>(API_URL + '/api/auth/forgot-password', { email });
    }
    resetPassword(token: string, newPassword: string): Observable<any> {
        return this.http.post<any>(API_URL + '/api/auth/reset-password', { token, newPassword });
    }
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }
    saveUser(user: any): void {
        localStorage.setItem('user', JSON.stringify(user));
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }
    getUser(): any {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }
}

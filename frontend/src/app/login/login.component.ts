import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../Services/auth.service'
import { Login } from '../models/login'

@Component({
    selector: 'app-login',
    standalone: false,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        rememberMe: new FormControl(false),
    })
    showPassword = false
    isLoading = false
    errorMessage = ''
    isDarkMode = false

    constructor(private authService: AuthService, private router: Router) {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true'
    }
    toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode
        localStorage.setItem('darkMode', String(this.isDarkMode))
    }
    togglePassword(): void {
        this.showPassword = !this.showPassword
    }
    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched()
            return
        }
        this.errorMessage = ''
        this.isLoading = true
        const loginData: Login = {
            email: this.loginForm.value.email || '',
            password: this.loginForm.value.password || '',
            rememberMe: this.loginForm.value.rememberMe || false,
        }
        this.authService.login(loginData).subscribe({
            next: (response) => {
                this.isLoading = false
                if (response.success) {
                    this.authService.saveToken(response.token)
                    this.authService.saveUser(response.user)
                     if (response.user.role === 'admin') {
                        this.router.navigate(['/admin']);
                    } else {
                        this.router.navigate(['/books']);
                    }
                }
            },
            error: (error) => {
                this.isLoading = false
                this.errorMessage = error?.error?.message || 'Invalid email or password.'
            },
        })
    }
}

import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../Services/auth.service'
import { Register } from '../models/register'

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    registerForm = new FormGroup({
        fullName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required]),
    })
    showPassword = false
    showConfirmPassword = false
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
    toggleConfirmPassword(): void {
        this.showConfirmPassword = !this.showConfirmPassword
    }
    passwordsDoNotMatch(): boolean {
        const password = this.registerForm.value.password
        const confirmPassword = this.registerForm.value.confirmPassword
        return !!password && !!confirmPassword && password !== confirmPassword
    }
    onSubmit(): void {
        if (this.registerForm.invalid || this.passwordsDoNotMatch()) {
            this.registerForm.markAllAsTouched()
            return
        }
        this.errorMessage = ''
        this.isLoading = true
        const registerData: Register = {
            name: this.registerForm.value.fullName || '',
            email: this.registerForm.value.email || '',
            password: this.registerForm.value.password || '',
        }
        this.authService.register(registerData).subscribe({
            next: (response) => {
                this.isLoading = false
                if (response.success) {
                    this.authService.saveToken(response.token)
                    this.authService.saveUser(response.user)
                    this.router.navigate(['/books'])
                }
            },
            error: (error) => {
                this.isLoading = false
                this.errorMessage = error?.error?.message || 'Could not create your account.'
            },
        })
    }
    goBack(): void {
        this.router.navigate(['/login'])
    }
}

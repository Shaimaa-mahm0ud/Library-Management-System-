import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false),
  });

  showPassword = false;
  isLoading = false;
  errorMessage = '';
  isDarkMode = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginData: Login = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
      rememberMe: this.loginForm.value.rememberMe || false,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {

        this.isLoading = false;

        if (response.token) {

          this.authService.saveToken(response.token);
          this.authService.saveUser(response.user);

          if (response.user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/book']);
          }

        } else {
          this.errorMessage = 'Login failed.';
        }
        this.cd.detectChanges()
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'Invalid email or password.';
          this.cd.detectChanges()
      }
    });
  }

}

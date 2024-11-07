import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError = '';
  showSuccessAlert = false;

  constructor(private router: Router) {}

  onLogin() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Simulated login credentials
    const validUser = 'admin';
    const validPassword = '123';

    if (this.username === validUser && this.password === validPassword) {
      this.showSuccessAlert = true; // Show animated alert box
      this.loginError = ''; // Clear any previous error messages
      localStorage.setItem('userLoggedIn', 'true'); // Set token in localStorage

      // Auto-hide the alert and navigate to the dashboard after 2 seconds
      setTimeout(() => {
        this.showSuccessAlert = false;
        this.router.navigate(['/dashboard']);
      }, 1000);
    } else {
      this.loginError = 'Invalid username or password';
      this.showSuccessAlert = false; // Hide alert if login fails
    }
  }
}

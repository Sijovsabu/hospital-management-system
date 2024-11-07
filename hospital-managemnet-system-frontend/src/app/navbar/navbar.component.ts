import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router) {
    setTimeout(() => {
      localStorage.setItem('userLoggedIn', 'false');
      this.router.navigate(['/login']);
    }, 43200000); // 5 minutes timeout
  }
  logout() {
    localStorage.setItem('userLoggedIn', 'false');
    this.router.navigate(['/login']);
  }
}

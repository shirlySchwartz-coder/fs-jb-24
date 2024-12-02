import { Component, inject } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router'; // הוספת ייבוא של רכיבים

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  router = inject(Router);
  onLogOut() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('empUser')
  }
}

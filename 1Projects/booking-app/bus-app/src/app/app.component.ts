import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MasterComponent } from './master/master.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employee-app';
}

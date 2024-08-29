import { Component } from '@angular/core';
import { OperationsComponent } from './components/operations/operations.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [OperationsComponent,FormsModule],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bank App';
}

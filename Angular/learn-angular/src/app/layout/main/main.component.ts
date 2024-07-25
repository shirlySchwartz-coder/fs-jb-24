import { Component } from '@angular/core';
import { CenterDirective } from '../../center.directive';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CenterDirective],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}

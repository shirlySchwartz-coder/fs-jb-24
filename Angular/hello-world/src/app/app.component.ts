import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './mainLayout/header/header.component';
import { ButtonOkComponent } from './mainLayout/button-ok/button-ok.component';
import { ButtonFailComponent } from './mainLayout/button-fail/button-fail.component';
import { FormsModule } from '@angular/forms';
import{MarkAttributeDirective} from './dir/mark-attribute.directive'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent, ButtonOkComponent, ButtonFailComponent, FormsModule,MarkAttributeDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Class 48';
  slogan= 'The Best Lecture';
  userName='Shirly Schwartz';
  message='Lets start Angular';
 userTemp = 0;
 userAmount=0;
 userLength=0;
 userSize=0;

 

}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {
  firstName: string = 'Angular Bus App';
  angularVersion = 'Version 18.2';
  version: number = 18;
  currentDate: Date = new Date();
  inputType: string = 'button';
  state: string = '';

  // create functions
  showWelcomeAlert(){
    //normal function
    alert('Welcome to Angular 18')
  }
showMessage(message:string){
  alert(message)
}

}

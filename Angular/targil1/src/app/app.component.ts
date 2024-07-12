import { NgClass, NgIf, NgStyle ,NgFor} from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, NgClass, NgStyle, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'targil1';
  userYear = 0;

  userAge=0;
  tellLies = true;

  youInTheArmyNow=false;

  isDarkMode = true;
  // txtColor = this.isDarkMode?"black":"white";
  // txtBackground = this.isDarkMode?"white":"black";

  userColor: Array<string>=['red_them', 'green_them','blue_them'];
  index=0;

  onNextColor(){
    console.log( )
   }

   

}

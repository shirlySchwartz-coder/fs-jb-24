import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Cars App';
  url = 'http://localhost:8080/api/v1/transport/car/';

  carNumber = 0;
  result: any;
  search() {
    async () => {
      await axios
        .get(this.url + this.carNumber)
        .then((res) => res.data)
        .then((data) => {
          this.result(JSON.stringify(data));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
}

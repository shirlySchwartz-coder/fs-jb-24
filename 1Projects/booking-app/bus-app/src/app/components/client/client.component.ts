import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResultModel } from '../../model/interface/role';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {

  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService);

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadClient();

  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res: APIResultModel) => {
      this.clientList = res.data;
    });
  }


  onSaveClient() {
    debugger;
    this.clientService
      .addUpdateClient(this.clientObj)
      .subscribe((res: APIResultModel) => {
        if (res.result) {
          alert('Client created');
          this.loadClient();
          this.clientObj = new Client();
        } else {
          alert(res.message);
        }
      });
  }
  onReset() {
    this.clientObj = new Client();
  }
  onDelete(id: number) {
    const confirmDelete = confirm('Sure you want to delete?');
    if (confirmDelete== true) {
      this.clientService.deleteClientById(id).subscribe((res: APIResultModel) => {
          if (res.result) {
            alert(`Client {{id}} deleted`);
            this.loadClient();
          } else {
            alert(res.message);
          }
        });
    }
  }
  onEdit(data: Client){
    this.clientObj = data
  }


}

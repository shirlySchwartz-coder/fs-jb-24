import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResultModel } from '../../model/interface/role';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  isLoading:boolean = true;
  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService);

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadClient();
    this.isLoading=false;
  }

  async loadClient() {
    await this.clientService.getAllClients().subscribe((res: APIResultModel) => {
      this.clientList = res.data;
    });
  }


  async onSaveClient() {
    debugger;
    await this.clientService
      .addUpdateClient(this.clientObj)
      .subscribe(async(res: APIResultModel) => {
        if (res.result) {
          alert('Client created');
          await this.loadClient();
          this.clientObj = new Client();
        } else {
          alert(res.message);
        }
      });
  }
  onReset() {
    this.clientObj = new Client();
  }
  async onDelete(id: number) {
    const confirmDelete = confirm(`Sure you want to delete ${id}?`);
    if (confirmDelete== true) {
      await this.clientService.deleteClientById(id).subscribe((res: APIResultModel) => {
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

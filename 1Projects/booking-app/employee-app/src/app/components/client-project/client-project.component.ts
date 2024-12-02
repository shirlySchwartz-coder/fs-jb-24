import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { ClientService } from '../../services/client.service';
import { APIResultModel, ClientProject, Employee } from '../../model/interface/role';
import { Client } from '../../model/class/Client';
import { AlertComponent } from "../reusebale/alert/alert.component";

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css',
})
export class ClientProjectComponent implements OnInit {
  isLoading: boolean = true;

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    startDate: new FormControl(''),
    expectedEndDate: new FormControl(''),
    leadByEmpId: new FormControl(''),
    completedDate: new FormControl(''),
    contactPerson: new FormControl(''),
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(),
    projectCost: new FormControl(),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl(''),
  });

  clientSrv = inject(ClientService);
  employeeList: Employee[] = [];
  clientList: Client[] = [];
  cardTitle = signal('Angular 18');
  projectList =signal<ClientProject[]>([])


  ngOnInit(): void {
    this.getAllClients();
    this.getAllEmployee();
    this.getAllClientProjects();
    this.isLoading=false;
  }
  getAllEmployee() {
    this.clientSrv.getAllEmployee().subscribe((res: APIResultModel) => {
      this.employeeList = res.data;
    });
  }
  getAllClients() {
    this.clientSrv.getAllClients().subscribe((res: APIResultModel) => {
      this.clientList = res.data;
    });
  }
  getAllClientProjects() {
    this.clientSrv.getAllProjects().subscribe((res: APIResultModel) => {
      this.projectList.set(res.data) ;
    });
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    console.log(formValue);
    debugger;

    this.clientSrv
      .AddUpdateClientProject(formValue)
      .subscribe((res: APIResultModel) => {
        if (res.result) {
          alert('Project Created Success');
        } else {
          alert(res.message);
        }
      });
  }

  changeTitle(){
    this.cardTitle.set('React')
  }
}

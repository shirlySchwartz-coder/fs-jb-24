import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { ClientService } from '../../services/client.service';
import { APIResultModel, Employee } from '../../model/interface/role';
import { Client } from '../../model/class/Client';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css',
})
export class ClientProjectComponent implements OnInit {
  isLoading: boolean = true;

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl('', [Validators.required,Validators.minLength(4)]),
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

  ngOnInit(): void {
    this.getAllClients();
    this.getAllEmployee();
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
}

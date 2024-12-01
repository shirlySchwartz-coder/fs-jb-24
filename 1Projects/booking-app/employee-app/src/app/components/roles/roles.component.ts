import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResultModel, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  http = inject(HttpClient);
  roleList: IRole[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.http
      .get<APIResultModel>(
        'https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles'
      )
      .subscribe((res: APIResultModel) => {
        this.roleList = res.data;
        this.isLoading = false;
      });
  }
}

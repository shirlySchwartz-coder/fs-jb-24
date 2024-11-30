import { APIResultModel, IDesignation } from '../../model/interface/role';
import { MasterService } from './../../services/master.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css',
})
export class DesignationComponent implements OnInit {
  designationList: IDesignation[] = [];
  isLoading: boolean = true;
  MasterService = inject(MasterService);

  ngOnInit(): void {
    this.MasterService.getDesignation().subscribe(
      (res: APIResultModel) => {
        this.designationList = res.data;
        this.isLoading = false;
      },
      (error) => {
        alert('Api error / Network down');
        this.isLoading = false;
      }
    );
  }
}

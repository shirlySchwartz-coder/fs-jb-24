import { Routes } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { ClientComponent } from './components/client/client.component';
import { EmployeeComponent } from './components/employee/employee.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'master',
    pathMatch: 'full'
  },
  {
    path: 'master',
    component: MasterComponent
  },
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  }
];

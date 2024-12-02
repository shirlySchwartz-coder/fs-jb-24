import { Routes } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { ClientComponent } from './components/client/client.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ClientProjectComponent } from './components/client-project/client-project.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'master',
        component: MasterComponent,
      },

      {
        path: 'employee',
        component: EmployeeComponent,
      },

      {
        path: 'client-project',
        component: ClientProjectComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
        canActivate:[authGuard]
      },
    ],
  },
];

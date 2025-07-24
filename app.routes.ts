import { Routes } from '@angular/router';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { MastercomponentComponent } from './mastercomponent/mastercomponent.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectEmployeeComponent } from './project-employee/project-employee.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: FirstpageComponent },
  {
    path: '',
    component: MastercomponentComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      { path: 'home/employee', component: EmployeeComponent, canActivate: [authGuard] },
      { path: 'home/project-employee', component: ProjectEmployeeComponent, canActivate: [authGuard] },
      { path: 'home/project', component: ProjectComponent, canActivate: [authGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

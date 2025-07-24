import { FooterComponent } from './footer/footer.component';
import { EmployeeComponent } from './employee/employee.component';
import { Component } from '@angular/core';
import { RouterOutlet,RouterLink} from '@angular/router';
import { LoginComponent } from './login/login.component';


import { ProjectEmployeeComponent } from './project-employee/project-employee.component';
import { ProjectComponent } from './project/project.component';
import { HomeComponent } from './home/home.component';
import { MastercomponentComponent } from './mastercomponent/mastercomponent.component';
import { FirstpageComponent } from './firstpage/firstpage.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,MastercomponentComponent,LoginComponent,EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeManagementSystem';
 
}

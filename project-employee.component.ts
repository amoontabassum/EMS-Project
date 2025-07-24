import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-employee.component.html',
  styleUrls: ['./project-employee.component.css']
})
export class ProjectEmployeeComponent {
  selectedClient: string = '';
  selectedEmployee: string = '';
  selectedEmployeeDetails: any = null;

  employees: any[] = [];
  projects: any[] = [];
  matchedRecords: any[] = [];
  uniqueClients: string[] = [];
  filteredEmployees: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe((data) => {
      this.employees = data || [];

      this.http.get<any[]>('http://localhost:3000/projects').subscribe((projectData) => {
        this.projects = projectData || [];

        const clientSet = new Set(this.projects.map(p => p.client));
        this.uniqueClients = Array.from(clientSet);
      });
    });
  }

  onClientChange() {
    this.filteredEmployees = [];
    this.selectedEmployee = '';
    this.selectedEmployeeDetails = null;

    if (!this.selectedClient) return;

    const clientProjects = this.projects.filter(p => p.client === this.selectedClient);
    const projectLeads = clientProjects.map(p => p.lead?.toLowerCase());

    this.filteredEmployees = this.employees.filter(emp =>
      projectLeads.includes(emp.name.toLowerCase())
    );
  }

  filterRecords() {
    if (!this.selectedClient || !this.selectedEmployee) return;

    const matchedProject = this.projects.find(
      proj =>
        proj.client?.trim().toLowerCase() === this.selectedClient.trim().toLowerCase() &&
        proj.lead?.trim().toLowerCase() === this.selectedEmployee.trim().toLowerCase()
    );

    const matchedEmployee = this.filteredEmployees.find(
      emp => emp.name?.trim().toLowerCase() === this.selectedEmployee.trim().toLowerCase()
    );

    if (matchedEmployee) {
      this.selectedEmployeeDetails = matchedEmployee;
    }

    if (matchedProject && matchedEmployee) {
      const newRecord = {
        empProjectId: this.matchedRecords.length + 1,
        client: matchedProject.client,
        empname: matchedEmployee.name,
        contact: matchedEmployee.contact,
        email: matchedEmployee.email,
        department: matchedEmployee.department,
        assignedDate: matchedProject.date,
        role: matchedEmployee.role,
        isActive: true
      };

      this.matchedRecords.push(newRecord);
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectName = '';
  clientName = '';
  startDate = '';
  endDate = '';
  leadBy = '';
  projects: any[] = [];
  employees: any[] = [];
  isEditing = false;
  editId: number | null = null;

  constructor(private projectService: ProjectService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadEmployees();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  loadEmployees() {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe(data => {
      this.employees = data;
    });
  }

  saveProject() {
    if (new Date(this.endDate) < new Date(this.startDate)) {
      alert('End Date cannot be earlier than Start Date.');
      return;
    }

    const projectData = {
      name: this.projectName,
      client: this.clientName,
      date: this.startDate,
      endDate: this.endDate,
      lead: this.leadBy
    };

    if (this.isEditing && this.editId !== null) {
      this.projectService.updateProject(this.editId, projectData).subscribe(() => {
        this.loadProjects();
        this.resetForm();
      });
    } else {
      this.projectService.addProject(projectData).subscribe(() => {
        this.loadProjects();
        this.resetForm();
      });
    }
  }

  editProject(project: any) {
    this.projectName = project.name;
    this.clientName = project.client;
    this.startDate = project.date;
    this.endDate = project.endDate;
    this.leadBy = project.lead;
    this.isEditing = true;
    this.editId = project.id;
  }

  deleteProject(project: any) {
    this.projectService.deleteProject(project.id).subscribe(() => {
      this.loadProjects();
      this.resetForm();
    });
  }

  resetForm() {
    this.projectName = '';
    this.clientName = '';
    this.startDate = '';
    this.endDate = '';
    this.leadBy = '';
    this.isEditing = false;
    this.editId = null;
  }
}

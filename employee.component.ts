import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeserviceService } from '../../app/employeeservice.service';
import { Router } from '@angular/router';

interface Employee {
  id?: number;
  name: string;
  contact: number;
  email: string;
  department: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee = {
    name: '',
    contact: 0,
    email: '',
    department: '',
    password: '',
    role: ''
  };
  isEditing = false;

  constructor(
    private employeeService: EmployeeserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  onSubmit(form: any): void {
    if (this.isEditing && this.employee.id !== undefined) {
      this.employeeService.updateEmployeeById(this.employee.id, this.employee).subscribe(() => {
        this.getData();
        this.resetForm(form);
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        this.getData();
        this.resetForm(form);
      });
    }
  }


  getData(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

 
  editEmployee(emp: Employee): void {
    this.employee = { ...emp };
    this.employee.id = emp.id; 
    this.isEditing = true;
  }


  deleteEmployee(id?: number): void {
    if (id !== undefined && confirm('Do You Want to Delete This Data?')) {
      this.employeeService.deleteEmployeeById(id).subscribe(() => {
        this.getData();
      });
    }
  }

  resetForm(form: any): void {
    form.resetForm();
    this.employee = {
      name: '',
      contact: 0,
      email: '',
      department: '',
      password: '',
      role: ''
    };
    this.isEditing = false;
  }
}
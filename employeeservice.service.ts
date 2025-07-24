import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Employee {
  name: string;
  contact: number;
  email: string;
  department: string;
  password: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})

export class EmployeeserviceService {
 baseURL:string='http://localhost:3000/employees';
  constructor(private http:HttpClient){
  }
  
  getEmployees():Observable<Employee[]>{
   return this.http.get<Employee[]>(`${this.baseURL}`);
  }


  addEmployee(employee:Employee):Observable<Employee>{
     return this.http.post<Employee>(`${this.baseURL}`,employee);

  }

 
  deleteEmployeeById(eid:number):Observable<void>{
    return this.http.delete<void>(`${this.baseURL}/${eid}`);
  }

 
   updateEmployeeById(eid:number,employee:Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.baseURL}/${eid}`,employee);
   }

   getEmployeeById(eid:number):Observable<Employee>{
    return this.http.get<Employee>(`${this.baseURL}/${eid}`);
   }
}

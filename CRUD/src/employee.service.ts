import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './model/employee.model'; // Adjust the import path as necessary
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiBaseUrl}/employees`;
  // private apiUrlon =`https://crudbackend.runasp.net/api/employees`
  constructor(private http: HttpClient) {}

  

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeByName(name: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/name/${name}`);
  }

  addEmployee(employee: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: string, employee: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMaxSalary(salary:number):Observable<any>{
    return this.http.get<Employee[]>(`${this.apiUrl}/salary/${salary}`);
  }
}

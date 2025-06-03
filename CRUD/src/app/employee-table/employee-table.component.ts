import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../model/employee.model';
import { NotFoundDialogComponent } from '../not-found-dialog/not-found-dialog.component';
import { P } from '@angular/cdk/keycodes';




@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    NotFoundDialogComponent,
  
  ],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'email', 'phone', 'salary', 'actions'];
  dataSource = new MatTableDataSource<Employee>();
  searchName = '';
  highSalary=0;
  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applySearch() {
    if (this.searchName.trim()) {
      this.employeeService.getEmployeeByName(this.searchName).subscribe({
        next: emp => {
          if (emp) {
            this.dataSource.data = [emp];
          } else {
            this.dialog.open(NotFoundDialogComponent, {
              data: { message: 'No employee found with that name.' }
            }).afterClosed().subscribe(() => {
              this.loadEmployees();
            });
          }
        },
        error: () => {
          this.dialog.open(NotFoundDialogComponent, {
            data: { message: 'No employee found with that name.' }
          }).afterClosed().subscribe(() => {
            this.loadEmployees();
          });
        }
      });
    } else {
      this.loadEmployees();
    }
  }

  applyHighSalarySearch(){
    if(this.highSalary>0){
      this.employeeService.getMaxSalary(this.highSalary).subscribe({
        next:employees=>{
          if(employees && employees.length>0){
            this.dataSource.data=employees
          }else{
            this.dialog.open(NotFoundDialogComponent,{
              data:{message:`No employee found with the salary>=${this.highSalary}`}
            }).afterClosed().subscribe(()=>{
              this.loadEmployees()
            })
          }
        },
        error:()=>{
          this.dialog.open(NotFoundDialogComponent,{
            data:{message:`Failed to fetch the data for  salary >=${this.highSalary}`}
          }).afterClosed().subscribe(()=>{
            this.loadEmployees();
          })
        }
      })
    }else{
      this.loadEmployees();
    }
  }



  onDelete(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  onEdit(emp: Employee) {
    emp.isEditing = true;
    emp.original = { ...emp }; // Backup for cancel
  }

  cancel(emp: Employee) {
    if (!emp.id) {
      this.dataSource.data = this.dataSource.data.filter(e => e !== emp);
    } else {
      Object.assign(emp, emp.original);
      emp.isEditing = false;
    }
  }

  save(emp: Employee) {
    const errors: string[] = [];
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!emp.name.trim()) {
      errors.push('Name is required.');
    } else if (!nameRegex.test(emp.name)) {
      errors.push('Name must contain only alphabets and spaces.');
    }

    if (!emp.email.trim() || !emp.email.includes('@')) {
      errors.push('A valid email is required.');
    }

    if (!emp.phone.trim() || emp.phone.length !=10) {
      errors.push('Phone number must 10 digits.');
    }

    if (emp.salary == null || emp.salary <= 0) {
      errors.push('Salary must be greater than 0.');
    }

    if (errors.length > 0) {
      this.dialog.open(NotFoundDialogComponent, {
        data: { message: errors.join('\n') }
      });
      return;
    }

    if (!emp.id) {
      this.employeeService.addEmployee(emp).subscribe(() => this.loadEmployees());
    } else {
      this.employeeService.updateEmployee(emp.id, emp).subscribe(() => {
        emp.isEditing = false;
      });
    }
  }

  onAdd() {
    const newEmp: Employee = {
      id: '',
      name: '',
      email: '',
      phone: '',
      salary: 0,
      isEditing: true
    };
    this.dataSource.data = [newEmp, ...this.dataSource.data];
  }
}

import { Routes } from '@angular/router';
import { EmployeeTableComponent } from './employee-table/employee-table.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeTableComponent  // Set as default route
  },
  {
    path: 'employees',
    component: EmployeeTableComponent  // Keep this route as well for consistency
  },
  {
    path: '**',  // Catch-all route
    redirectTo: ''
  }
];

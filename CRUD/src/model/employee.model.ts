export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  salary: number;
   isEditing?: boolean;
   original?: Employee;
}

import type { PaginatedList, Meta, Links } from './response';

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  position: string;
  salary: number;
  hire_date: string;
  department: string;
  status: 'active' | 'inactive';
  address?: string;
  notes?: string | null;
  years_of_service?: number;
  created_at: string;
  updated_at: string;
}

export interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  position: string;
  salary: number | string;
  hire_date: string;
  department: string;
  status?: 'active' | 'inactive';
  address?: string;
  notes?: string;
}

export interface CreateEmployeeDto {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  position: string;
  salary: number;
  hire_date?: string;
  department: string;
  status?: 'active' | 'inactive';
  address?: string;
  notes?: string;
}

export interface UpdateEmployeeDto {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  position?: string;
  salary?: number;
  hire_date?: string;
  department?: string;
  status?: 'active' | 'inactive';
  address?: string;
  notes?: string;
}

export type EmployeeListResponse = PaginatedList<Employee>;

export type PaginationMeta = Meta;
export type PaginationLinks = Links;

export interface PaginatedResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface EmployeeStats {
  total_employees: number;
  active_employees: number;
  inactive_employees: number;
  departments_count: number;
  average_salary: number;
  total_payroll: number;
  by_department: Array<{
    department: string;
    count: number;
  }>;
  recent_hires: number;
}

export interface EmployeeFilters {
  search?: string;
  department?: string;
  position?: string;
  status?: 'active' | 'inactive';
  sort_by?: 'name' | 'email' | 'position' | 'salary' | 'hire_date' | 'department' | 'created_at';
  sort_direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
  [key: string]: unknown;
}

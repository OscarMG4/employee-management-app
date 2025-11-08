export interface Department {
  id: number;
  name: string;
  parent_id: number | null;
  parent?: {
    id: number;
    name: string;
  };
  level: number;
  employee_count: number;
  ambassador_name: string | null;
  children_count: number;
  children?: Department[];
  created_at: string;
  updated_at: string;
}

export interface DepartmentFormData {
  name: string;
  parent_id?: number | null;
  level: number;
  employee_count: number;
  ambassador_name?: string;
}

export interface DepartmentFilters {
  search?: string;
  search_column?: 'name' | 'ambassador_name';
  level?: number[];
  name?: string[];
  parent_name?: string[];
  min_employees?: number;
  max_employees?: number;
  sort_by?: 'name' | 'level' | 'employee_count' | 'created_at';
  sort_order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

export type DepartmentListResponse = {
  data: Department[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};

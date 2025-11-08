import api from './api';
import type {
  Employee,
  EmployeeFormData,
  EmployeeListResponse,
  EmployeeStats,
  EmployeeFilters,
} from '../types/employee';

const employeeService = {
  getAll: async (filters?: EmployeeFilters): Promise<EmployeeListResponse> => {
    const response = await api.post<EmployeeListResponse>('/employees/search', filters || {});
    return response.data;
  },

  getById: async (id: number): Promise<Employee> => {
    const response = await api.get<{ data: Employee }>(`/employees/${id}`);
    return response.data.data;
  },

  create: async (data: EmployeeFormData): Promise<Employee> => {
    const response = await api.post<{ data: Employee }>('/employees', data);
    return response.data.data;
  },

  update: async (id: number, data: Partial<EmployeeFormData>): Promise<Employee> => {
    const response = await api.put<{ data: Employee }>(`/employees/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },

  getStatistics: async (): Promise<EmployeeStats> => {
    const response = await api.get<EmployeeStats>('/employees/statistics');
    return response.data;
  },

  getDepartments: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/employees/departments');
    return response.data;
  },

  getPositions: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/employees/positions');
    return response.data;
  },
};

export default employeeService;

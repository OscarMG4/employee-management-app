import api from './api';
import type {
  Department,
  DepartmentFormData,
  DepartmentListResponse,
  DepartmentFilters,
} from '../types/department';

export const departmentService = {
  async getDepartments(
    filters?: DepartmentFilters
  ): Promise<DepartmentListResponse> {
    const response = await api.get<DepartmentListResponse>(
      '/departments',
      { params: filters }
    );
    return response.data;
  },

  async getDepartment(id: number): Promise<Department> {
    const response = await api.get<{ data: Department }>(
      `/departments/${id}`
    );
    return response.data.data;
  },

  async getSubdepartments(id: number): Promise<Department[]> {
    const response = await api.get<{ data: Department[] }>(
      `/departments/${id}/subdepartments`
    );
    return response.data.data;
  },

  async createDepartment(data: DepartmentFormData): Promise<Department> {
    const response = await api.post<{ data: Department }>(
      '/departments',
      data
    );
    return response.data.data;
  },

  async updateDepartment(
    id: number,
    data: Partial<DepartmentFormData>
  ): Promise<Department> {
    const response = await api.put<{ data: Department }>(
      `/departments/${id}`,
      data
    );
    return response.data.data;
  },

  async deleteDepartment(id: number): Promise<void> {
    await api.delete(`/departments/${id}`);
  },
};

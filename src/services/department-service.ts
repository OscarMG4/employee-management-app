import axios from 'axios';
import type {
  Department,
  DepartmentFormData,
  DepartmentListResponse,
  DepartmentFilters,
} from '../types/department';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const departmentService = {
  async getDepartments(
    filters?: DepartmentFilters
  ): Promise<DepartmentListResponse> {
    const response = await axios.get<DepartmentListResponse>(
      `${API_URL}/departments`,
      { params: filters }
    );
    return response.data;
  },

  async getDepartment(id: number): Promise<Department> {
    const response = await axios.get<{ data: Department }>(
      `${API_URL}/departments/${id}`
    );
    return response.data.data;
  },

  async getSubdepartments(id: number): Promise<Department[]> {
    const response = await axios.get<{ data: Department[] }>(
      `${API_URL}/departments/${id}/subdepartments`
    );
    return response.data.data;
  },

  async createDepartment(data: DepartmentFormData): Promise<Department> {
    const response = await axios.post<{ data: Department }>(
      `${API_URL}/departments`,
      data
    );
    return response.data.data;
  },

  async updateDepartment(
    id: number,
    data: Partial<DepartmentFormData>
  ): Promise<Department> {
    const response = await axios.put<{ data: Department }>(
      `${API_URL}/departments/${id}`,
      data
    );
    return response.data.data;
  },

  async deleteDepartment(id: number): Promise<void> {
    await axios.delete(`${API_URL}/departments/${id}`);
  },
};

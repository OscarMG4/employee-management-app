import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { departmentService } from '../services/department-service';
import type {
  DepartmentFormData,
  DepartmentFilters,
} from '../types/department';

const DEPARTMENTS_KEY = 'departments';

export function useDepartments(filters?: DepartmentFilters) {
  return useQuery({
    queryKey: [DEPARTMENTS_KEY, filters],
    queryFn: () => departmentService.getDepartments(filters),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useDepartment(id: number) {
  return useQuery({
    queryKey: [DEPARTMENTS_KEY, id],
    queryFn: () => departmentService.getDepartment(id),
    enabled: !!id,
  });
}

export function useSubdepartments(id: number) {
  return useQuery({
    queryKey: [DEPARTMENTS_KEY, id, 'subdepartments'],
    queryFn: () => departmentService.getSubdepartments(id),
    enabled: !!id,
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DepartmentFormData) =>
      departmentService.createDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENTS_KEY] });
      message.success('Departamento creado exitosamente');
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al crear departamento';
      message.error(errorMessage);
    },
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DepartmentFormData> }) =>
      departmentService.updateDepartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENTS_KEY] });
      message.success('Departamento actualizado exitosamente');
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al actualizar departamento';
      message.error(errorMessage);
    },
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => departmentService.deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENTS_KEY] });
      message.success('Departamento eliminado exitosamente');
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al eliminar departamento';
      message.error(errorMessage);
    },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import employeeService from '../services/employee-service';
import type { EmployeeFormData, EmployeeFilters } from '../types/employee';
import toast from 'react-hot-toast';

export const useEmployees = (filters?: EmployeeFilters) => {
  return useQuery({
    queryKey: ['employees', filters],
    queryFn: () => employeeService.getAll(filters),
  });
};

export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => employeeService.getById(id),
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: employeeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      toast.success('Empleado creado exitosamente');
    },
    onError: () => toast.error('Error al crear empleado'),
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<EmployeeFormData> }) =>
      employeeService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      toast.success('Empleado actualizado exitosamente');
    },
    onError: () => toast.error('Error al actualizar empleado'),
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: employeeService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      toast.success('Empleado eliminado exitosamente');
    },
    onError: () => toast.error('Error al eliminar empleado'),
  });
};

export const useEmployeeStatistics = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: employeeService.getStatistics,
  });
};

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: employeeService.getDepartments,
  });
};

export const usePositions = () => {
  return useQuery({
    queryKey: ['positions'],
    queryFn: employeeService.getPositions,
  });
};

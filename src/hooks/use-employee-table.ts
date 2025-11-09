import type { TablePaginationConfig } from 'antd';
import type { EmployeeFilters } from '../types/employee';
import { useTableFilters } from './use-table-filters';

export function useEmployeeTable() {
  const {
    filters,
    setFilters,
    handleSearch,
    handleTableChange: baseHandleTableChange,
    resetToFirstPage,
  } = useTableFilters<EmployeeFilters>({
    page: 1,
    per_page: 10,
    sort_by: 'created_at',
    sort_direction: 'desc',
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    tableFilters: Record<string, unknown>,
    sorter: unknown
  ) => {
    baseHandleTableChange(pagination, tableFilters, sorter, (filters) => ({
      department: filters.department as string | undefined,
      position: filters.position as string | undefined,
      status: filters.status as 'active' | 'inactive' | undefined,
      sort_by: sorter && (sorter as { field?: string }).field 
        ? (sorter as { field: string }).field as EmployeeFilters['sort_by']
        : undefined,
      sort_direction: sorter && (sorter as { order?: string }).order
        ? ((sorter as { order: string }).order === 'ascend' ? 'asc' : 'desc')
        : undefined,
    }));
  };

  return {
    filters,
    setFilters,
    handleSearch,
    handleTableChange,
    resetToFirstPage,
  };
}

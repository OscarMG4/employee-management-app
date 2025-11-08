import { useState } from 'react';
import type { TablePaginationConfig } from 'antd';
import type { DepartmentFilters } from '../types/department';

export function useDepartmentTable() {
  const [filters, setFilters] = useState<DepartmentFilters>({
    page: 1,
    per_page: 10,
    sort_by: 'created_at',
    sort_order: 'desc',
    search_column: 'name',
  });

  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value || undefined,
      page: 1,
    }));
  };

  const handleSearchColumnChange = (column: 'name' | 'ambassador_name') => {
    setFilters((prev) => ({
      ...prev,
      search_column: column,
    }));
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    tableFilters: Record<string, unknown>,
    sorter: unknown
  ) => {
    const sort = sorter as { field?: string; order?: 'ascend' | 'descend' };

    setFilters((prev) => ({
      ...prev,
      page: pagination.current || 1,
      per_page: pagination.pageSize || 10,
      level: tableFilters.level as number[] | undefined,
      name: tableFilters.name as string[] | undefined,
      parent_name: tableFilters.parent as string[] | undefined,
      ...(sort.field && {
        sort_by: sort.field as DepartmentFilters['sort_by'],
        sort_order: sort.order === 'ascend' ? 'asc' : 'desc',
      }),
    }));
  };

  const resetToFirstPage = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  return {
    filters,
    setFilters,
    handleSearch,
    handleSearchColumnChange,
    handleTableChange,
    resetToFirstPage,
  };
}

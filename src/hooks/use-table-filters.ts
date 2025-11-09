import { useState } from 'react';
import type { TablePaginationConfig } from 'antd';

interface BaseFilters {
  page?: number;
  per_page?: number;
  search?: string;
  [key: string]: unknown;
}

export function useTableFilters<T extends BaseFilters>(initialFilters: T) {
  const [filters, setFilters] = useState<T>(initialFilters);

  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value || undefined,
      page: 1,
    }));
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    tableFilters: Record<string, unknown>,
    sorter: unknown,
    filterMapper?: (filters: Record<string, unknown>) => Partial<T>
  ) => {
    const sort = sorter as { field?: string; order?: 'ascend' | 'descend' };

    const mappedFilters = filterMapper ? filterMapper(tableFilters) : {};

    setFilters((prev) => ({
      ...prev,
      page: pagination.current || 1,
      per_page: pagination.pageSize || 10,
      ...mappedFilters,
      ...(sort.field && {
        sort_by: sort.field,
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
    handleTableChange,
    resetToFirstPage,
  };
}

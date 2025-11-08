import type { Department, DepartmentFilters } from '../types/department';
import { FilterDropdown } from '../components/departments/filter-dropdown';

function getUniqueValues<T>(
  data: Department[] | undefined,
  extractor: (dept: Department) => T | undefined
): T[] {
  if (!data) return [];
  const values = data.map(extractor).filter((v): v is T => v !== undefined);
  return [...new Set(values)].sort();
}

/**
 * Crea configuración de filtro con checkboxes
 */
export function createCheckboxFilter<T extends string | number>(
  options: T[],
  renderLabel?: (value: T) => string
) {
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: {
      setSelectedKeys: (keys: React.Key[]) => void;
      selectedKeys: React.Key[];
      confirm: () => void;
      clearFilters?: () => void;
    }) => (
      <FilterDropdown
        options={options}
        selectedKeys={selectedKeys as T[]}
        setSelectedKeys={(keys) => setSelectedKeys(keys as React.Key[])}
        confirm={confirm}
        clearFilters={clearFilters}
        renderLabel={renderLabel as (value: string | number) => string}
      />
    ),
  };
}

export function createSortConfig(
  field: DepartmentFilters['sort_by'],
  filters: DepartmentFilters
) {
  return {
    sorter: true,
    sortOrder:
      filters.sort_by === field
        ? filters.sort_order === 'asc'
          ? ('ascend' as const)
          : ('descend' as const)
        : null,
  };
}

export function getLevelOptions(data?: Department[]): number[] {
  return getUniqueValues(data, (d) => d.level);
}

export function getNameOptions(data?: Department[]): string[] {
  return getUniqueValues(data, (d) => d.name);
}

export function getParentNameOptions(data?: Department[]): string[] {
  return getUniqueValues(data, (d) => d.parent?.name);
}

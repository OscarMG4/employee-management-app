import { Button, Space, Tag, Tooltip } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { Employee, EmployeeFilters } from '../../types/employee';
import { FilterDropdown } from '../departments/filter-dropdown';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface EmployeeColumnsConfig {
  filters: EmployeeFilters;
  data?: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const getDepartmentOptions = (data?: Employee[]): string[] => {
  if (!data) return [];
  const uniqueDepartments = Array.from(
    new Set(data.map((e) => e.department).filter(Boolean))
  );
  return uniqueDepartments.sort();
};

const getPositionOptions = (data?: Employee[]): string[] => {
  if (!data) return [];
  const uniquePositions = Array.from(
    new Set(data.map((e) => e.position).filter(Boolean))
  );
  return uniquePositions.sort();
};

const getStatusOptions = (): string[] => ['active', 'inactive'];

const createEmployeeSortConfig = (
  field: EmployeeFilters['sort_by'],
  filters: EmployeeFilters
) => {
  return {
    sorter: true,
    sortOrder:
      filters.sort_by === field
        ? filters.sort_direction === 'asc'
          ? ('ascend' as const)
          : ('descend' as const)
        : null,
  };
};

const createEmployeeCheckboxFilter = <T extends string | number>(
  options: T[],
  renderLabel?: (value: T) => string
) => {
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
};

export function getEmployeeColumns({
  filters,
  data,
  onEdit,
  onDelete,
}: EmployeeColumnsConfig): TableProps<Employee>['columns'] {
  return [
    {
      title: 'Nombre',
      key: 'name',
      width: '20%',
      render: (_: unknown, record: Employee) => (
        <Space direction="vertical" size={0}>
          <span className="font-medium">
            {record.first_name} {record.last_name}
          </span>
          <span className="text-xs text-gray-500">{record.email}</span>
        </Space>
      ),
    },
    {
      title: 'Departamento',
      dataIndex: 'department',
      key: 'department',
      width: '15%',
      ...createEmployeeSortConfig('department', filters),
      ...createEmployeeCheckboxFilter(getDepartmentOptions(data)),
    },
    {
      title: 'Cargo',
      dataIndex: 'position',
      key: 'position',
      width: '15%',
      ...createEmployeeSortConfig('position', filters),
      ...createEmployeeCheckboxFilter(getPositionOptions(data)),
    },
    {
      title: 'Salario',
      dataIndex: 'salary',
      key: 'salary',
      width: '12%',
      align: 'right',
      ...createEmployeeSortConfig('salary', filters),
      render: (salary: number) => formatCurrency(salary),
    },
    {
      title: 'Fecha de Ingreso',
      dataIndex: 'hire_date',
      key: 'hire_date',
      width: '12%',
      ...createEmployeeSortConfig('hire_date', filters),
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      align: 'center',
      ...createEmployeeCheckboxFilter(getStatusOptions(), (status) => 
        status === 'active' ? 'Activo' : 'Inactivo'
      ),
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Activo' : 'Inactivo'}
        </Tag>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: '80px',
      align: 'center',
      render: (_: unknown, record: Employee) => (
        <Space>
          <Tooltip title="Editar">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => onDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
}

import { Button, Space, Tooltip } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { Department, DepartmentFilters } from '../../types/department';
import {
  createCheckboxFilter,
  createSortConfig,
  getLevelOptions,
  getNameOptions,
  getParentNameOptions,
} from '../../utils/table-helpers';

interface DepartmentColumnsConfig {
  filters: DepartmentFilters;
  data?: Department[];
  onEdit: (department: Department) => void;
  onDelete: (id: number) => void;
}

export function getDepartmentColumns({
  filters,
  data,
  onEdit,
  onDelete,
}: DepartmentColumnsConfig): TableProps<Department>['columns'] {
  return [
    {
      title: 'División',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...createSortConfig('name', filters),
      ...createCheckboxFilter(getNameOptions(data)),
      render: (text: string) => (
        <Space>
          <span className="font-medium">{text}</span>
        </Space>
      ),
    },
    {
      title: 'División superior',
      dataIndex: ['parent', 'name'],
      key: 'parent',
      width: '20%',
      ...createCheckboxFilter(getParentNameOptions(data)),
      render: (text: string) => text || 'Dirección general',
    },
    {
      title: 'Colaboradores',
      dataIndex: 'employee_count',
      key: 'employee_count',
      width: '15%',
      align: 'center',
      ...createSortConfig('employee_count', filters),
      render: (count: number) => count || 0,
    },
    {
      title: 'Nivel',
      dataIndex: 'level',
      key: 'level',
      width: '10%',
      align: 'center',
      ...createSortConfig('level', filters),
      ...createCheckboxFilter(
        getLevelOptions(data),
        (level: string | number) => `Nivel ${level}`
      ),
      render: (level: number) => level,
    },
    {
      title: 'Subdivisiones',
      dataIndex: 'children_count',
      key: 'children_count',
      width: '15%',
      align: 'center',
      render: (count: number) => (
        <Button type="link" icon={<ApartmentOutlined />} style={{ padding: 0 }}>
          {count || 0}
        </Button>
      ),
    },
    {
      title: 'Embajadores',
      dataIndex: 'ambassador_name',
      key: 'ambassador_name',
      width: '15%',
      render: (text: string) => text || '-',
    },
    {
      title: '',
      key: 'actions',
      width: '80px',
      align: 'center',
      render: (_: unknown, record: Department) => (
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

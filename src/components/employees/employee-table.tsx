import { Table, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import type { Employee, EmployeeFilters } from '../../types/employee';
import { getEmployeeColumns } from './employee-columns';

interface EmployeeTableProps {
  data?: Employee[];
  loading: boolean;
  filters: EmployeeFilters;
  total: number;
  onTableChange: TableProps<Employee>['onChange'];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

export function EmployeeTable({
  data,
  loading,
  filters,
  total,
  onTableChange,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const columns = getEmployeeColumns({
    filters,
    data,
    onEdit,
    onDelete: (id) => handleDelete(id),
  });

  const columnsWithConfirm = columns?.map((col) => {
    if (col && 'key' in col && col.key === 'actions') {
      return {
        ...col,
        render: (_: unknown, record: Employee) => {
          const originalRender = col.render as (
            value: unknown,
            record: Employee
          ) => React.ReactNode;
          const actions = originalRender(_, record);

          return (
            <Popconfirm
              title="¿Eliminar colaborador?"
              description="Esta acción no se puede deshacer"
              onConfirm={() => handleDelete(record.id)}
              okText="Eliminar"
              cancelText="Cancelar"
              okButtonProps={{ danger: true }}
            >
              {actions}
            </Popconfirm>
          );
        },
      };
    }
    return col;
  });

  return (
    <Table<Employee>
      columns={columnsWithConfirm}
      dataSource={data}
      rowKey="id"
      loading={loading}
      onChange={onTableChange}
      pagination={{
        current: filters.page,
        pageSize: filters.per_page,
        total,
        showSizeChanger: true,
        showTotal: (total) => `Total colaboradores: ${total}`,
        pageSizeOptions: ['10', '20', '50', '100'],
        style: { marginTop: 16 },
      }}
      scroll={{ x: 1200 }}
      size="middle"
    />
  );
}

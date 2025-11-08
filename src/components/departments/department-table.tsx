import { Table, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import type { Department, DepartmentFilters } from '../../types/department';
import { getDepartmentColumns } from './department-columns';

interface DepartmentTableProps {
  data?: Department[];
  loading: boolean;
  filters: DepartmentFilters;
  total: number;
  onTableChange: TableProps<Department>['onChange'];
  onEdit: (department: Department) => void;
  onDelete: (id: number) => void;
}

export function DepartmentTable({
  data,
  loading,
  filters,
  total,
  onTableChange,
  onEdit,
  onDelete,
}: DepartmentTableProps) {
  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const columns = getDepartmentColumns({
    filters,
    data,
    onEdit,
    onDelete: (id) => handleDelete(id),
  });

  const columnsWithConfirm = columns?.map((col) => {
    if (col && 'key' in col && col.key === 'actions') {
      return {
        ...col,
        render: (_: unknown, record: Department) => {
          const originalRender = col.render as (
            value: unknown,
            record: Department
          ) => React.ReactNode;
          const actions = originalRender(_, record);

          return (
            <Popconfirm
              title="¿Eliminar departamento?"
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
    <Table<Department>
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

import { useState } from 'react';
import { Button, Input, Space, Tabs, Dropdown } from 'antd';
import {
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  UnorderedListOutlined,
  PartitionOutlined,
} from '@ant-design/icons';
import type { Department, DepartmentFormData } from '../types/department';
import {
  useDepartments,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
} from '../hooks/use-departments';
import { useDepartmentTable } from '../hooks/use-department-table';
import { DepartmentModal } from '../components/departments/department-modal';
import { DepartmentTable } from '../components/departments/department-table';

const { Search } = Input;

export default function DepartmentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedDepartment, setSelectedDepartment] = useState<Department>();
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('list');
  const [activeTab, setActiveTab] = useState('divisions');

  const {
    filters,
    handleSearch,
    handleTableChange,
    resetToFirstPage,
  } = useDepartmentTable();

  const { data, isLoading } = useDepartments(filters);
  const createMutation = useCreateDepartment();
  const updateMutation = useUpdateDepartment();
  const deleteMutation = useDeleteDepartment();

  const handleCreate = () => {
    setModalMode('create');
    setSelectedDepartment(undefined);
    setModalOpen(true);
  };

  const handleEdit = (department: Department) => {
    setModalMode('edit');
    setSelectedDepartment(department);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        resetToFirstPage();
      },
    });
  };

  const handleModalSubmit = (values: DepartmentFormData) => {
    if (modalMode === 'create') {
      createMutation.mutate(values, {
        onSuccess: () => {
          setModalOpen(false);
          resetToFirstPage();
        },
      });
    } else if (selectedDepartment) {
      updateMutation.mutate(
        { id: selectedDepartment.id, data: values },
        {
          onSuccess: () => {
            setModalOpen(false);
          },
        }
      );
    }
  };

  const tabItems = [
    {
      key: 'divisions',
      label: `Divisiones`,
    },
    {
      key: 'employees',
      label: 'Colaboradores',
    },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#fff' }}>
      <div
        style={{
          background: '#fff',
          padding: '16px 24px',
          marginBottom: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 500 }}>
            Organización
          </h1>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
            />
            <Button icon={<UploadOutlined />} />
            <Button icon={<DownloadOutlined />} />
          </Space>
        </div>
      </div>

      <div style={{ padding: '0' }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          style={{ 
            background: '#fff',
            padding: '0 24px',
            marginBottom: 0,
          }}
          tabBarStyle={{
            marginBottom: 0,
          }}
        />

        <div
          style={{
            background: '#fafafa',
            padding: '12px 24px',
            borderTop: '1px solid #f0f0f0',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <Space.Compact>
            <Button
              type={viewMode === 'list' ? 'primary' : 'default'}
              icon={<UnorderedListOutlined />}
              onClick={() => setViewMode('list')}
            >
              Listado
            </Button>
            <Button
              type={viewMode === 'tree' ? 'primary' : 'default'}
              icon={<PartitionOutlined />}
              onClick={() => setViewMode('tree')}
            >
              Árbol
            </Button>
          </Space.Compact>

          <Dropdown
            menu={{
              items: [
                { key: 'columns', label: 'Columnas' },
              ],
            }}
          >
            <Button>Columnas</Button>
          </Dropdown>

          <Search
            placeholder="Buscar"
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        </div>

        <div style={{ background: '#fff', padding: '16px 24px 24px' }}>
          {activeTab === 'divisions' && (
            <DepartmentTable
              data={data?.data}
              loading={isLoading}
              filters={filters}
              total={data?.meta?.total || 0}
              onTableChange={handleTableChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          {activeTab === 'employees' && (
            <div style={{ padding: '24px', textAlign: 'center' }}>
              Tabla de colaboradores (pendiente)
            </div>
          )}
        </div>
      </div>

      <DepartmentModal
        open={modalOpen}
        mode={modalMode}
        department={selectedDepartment}
        departments={data?.data || []}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

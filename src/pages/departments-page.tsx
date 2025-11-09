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
import type { Employee, EmployeeFormData } from '../types/employee';
import {
  useDepartments,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
} from '../hooks/use-departments';
import {
  useEmployees,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
  useDepartments as useEmployeeDepartments,
  usePositions,
} from '../hooks/use-employees';
import { useDepartmentTable } from '../hooks/use-department-table';
import { useEmployeeTable } from '../hooks/use-employee-table';
import { DepartmentModal } from '../components/departments/department-modal';
import { DepartmentTable } from '../components/departments/department-table';
import { EmployeeModal } from '../components/employees/employee-modal';
import { EmployeeTable } from '../components/employees/employee-table';

const { Search } = Input;

export default function DepartmentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedDepartment, setSelectedDepartment] = useState<Department>();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('list');
  const [activeTab, setActiveTab] = useState('divisions');

  const {
    filters: deptFilters,
    handleSearch: handleDeptSearch,
    handleTableChange: handleDeptTableChange,
    resetToFirstPage: resetDeptToFirstPage,
  } = useDepartmentTable();

  const { data: deptData, isLoading: isDeptLoading } = useDepartments(deptFilters);
  const createDeptMutation = useCreateDepartment();
  const updateDeptMutation = useUpdateDepartment();
  const deleteDeptMutation = useDeleteDepartment();

  const {
    filters: empFilters,
    handleSearch: handleEmpSearch,
    handleTableChange: handleEmpTableChange,
    resetToFirstPage: resetEmpToFirstPage,
  } = useEmployeeTable();

  const { data: empData, isLoading: isEmpLoading } = useEmployees(empFilters);
  const createEmpMutation = useCreateEmployee();
  const updateEmpMutation = useUpdateEmployee();
  const deleteEmpMutation = useDeleteEmployee();
  const { data: departmentsList } = useEmployeeDepartments();
  const { data: positionsList } = usePositions();

  const handleCreateDept = () => {
    setActiveTab('divisions');
    setModalMode('create');
    setSelectedDepartment(undefined);
    setModalOpen(true);
  };

  const handleEditDept = (department: Department) => {
    setActiveTab('divisions');
    setModalMode('edit');
    setSelectedDepartment(department);
    setModalOpen(true);
  };

  const handleDeleteDept = (id: number) => {
    deleteDeptMutation.mutate(id, {
      onSuccess: () => {
        resetDeptToFirstPage();
      },
    });
  };

  const handleDeptModalSubmit = (values: DepartmentFormData) => {
    if (modalMode === 'create') {
      createDeptMutation.mutate(values, {
        onSuccess: () => {
          setModalOpen(false);
          resetDeptToFirstPage();
        },
      });
    } else if (selectedDepartment) {
      updateDeptMutation.mutate(
        { id: selectedDepartment.id, data: values },
        {
          onSuccess: () => {
            setModalOpen(false);
          },
        }
      );
    }
  };

  const handleCreateEmp = () => {
    setActiveTab('employees');
    setModalMode('create');
    setSelectedEmployee(undefined);
    setModalOpen(true);
  };

  const handleEditEmp = (employee: Employee) => {
    setActiveTab('employees');
    setModalMode('edit');
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handleDeleteEmp = (id: number) => {
    deleteEmpMutation.mutate(id, {
      onSuccess: () => {
        resetEmpToFirstPage();
      },
    });
  };

  const handleEmpModalSubmit = (values: EmployeeFormData) => {
    if (modalMode === 'create') {
      createEmpMutation.mutate(values, {
        onSuccess: () => {
          setModalOpen(false);
          resetEmpToFirstPage();
        },
      });
    } else if (selectedEmployee) {
      updateEmpMutation.mutate(
        { id: selectedEmployee.id, data: values },
        {
          onSuccess: () => {
            setModalOpen(false);
          },
        }
      );
    }
  };

  const handleCreate = () => {
    if (activeTab === 'divisions') {
      handleCreateDept();
    } else {
      handleCreateEmp();
    }
  };

  const handleModalSubmit = (values: DepartmentFormData | EmployeeFormData) => {
    if (activeTab === 'divisions') {
      handleDeptModalSubmit(values as DepartmentFormData);
    } else {
      handleEmpModalSubmit(values as EmployeeFormData);
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
            onSearch={activeTab === 'divisions' ? handleDeptSearch : handleEmpSearch}
            style={{ width: 300 }}
          />
        </div>

        <div style={{ background: '#fff', padding: '16px 24px 24px' }}>
          {activeTab === 'divisions' && (
            <DepartmentTable
              data={deptData?.data}
              loading={isDeptLoading}
              filters={deptFilters}
              total={deptData?.meta?.total || 0}
              onTableChange={handleDeptTableChange}
              onEdit={handleEditDept}
              onDelete={handleDeleteDept}
            />
          )}
          {activeTab === 'employees' && (
            <EmployeeTable
              data={empData?.data}
              loading={isEmpLoading}
              filters={empFilters}
              total={empData?.meta?.total || 0}
              onTableChange={handleEmpTableChange}
              onEdit={handleEditEmp}
              onDelete={handleDeleteEmp}
            />
          )}
        </div>
      </div>

      {activeTab === 'divisions' ? (
        <DepartmentModal
          open={modalOpen}
          mode={modalMode}
          department={selectedDepartment}
          departments={deptData?.data || []}
          onCancel={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          loading={createDeptMutation.isPending || updateDeptMutation.isPending}
        />
      ) : (
        <EmployeeModal
          open={modalOpen}
          mode={modalMode}
          employee={selectedEmployee}
          departments={departmentsList || []}
          positions={positionsList || []}
          onCancel={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          loading={createEmpMutation.isPending || updateEmpMutation.isPending}
        />
      )}
    </div>
  );
}

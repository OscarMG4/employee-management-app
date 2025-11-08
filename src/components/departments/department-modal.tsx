import { Modal, Form, Input, InputNumber, TreeSelect } from 'antd';
import { useEffect } from 'react';
import type { Department, DepartmentFormData } from '../../types/department';

interface TreeNode {
  value: number;
  title: string;
  disabled?: boolean;
  children?: TreeNode[];
}

interface DepartmentModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  department?: Department;
  departments: Department[];
  onSubmit: (data: DepartmentFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function DepartmentModal({
  open,
  mode,
  department,
  departments,
  onSubmit,
  onCancel,
  loading,
}: DepartmentModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && mode === 'edit' && department) {
      form.setFieldsValue({
        name: department.name,
        parent_id: department.parent_id,
        level: department.level,
        employee_count: department.employee_count,
        ambassador_name: department.ambassador_name,
      });
    } else if (open && mode === 'create') {
      form.resetFields();
    }
  }, [open, mode, department, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const buildDepartmentTree = (
    deps: Department[],
    parentId: number | null = null
  ): TreeNode[] => {
    return deps
      .filter((d) => d.parent_id === parentId)
      .map((d) => ({
        value: d.id,
        title: d.name,
        disabled: mode === 'edit' && department?.id === d.id,
        children: buildDepartmentTree(deps, d.id),
      }));
  };

  const treeData: TreeNode[] = [
    {
      value: 0,
      title: 'Sin departamento padre',
      children: buildDepartmentTree(departments),
    },
  ];

  return (
    <Modal
      title={mode === 'create' ? 'Crear Departamento' : 'Editar Departamento'}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText={mode === 'create' ? 'Crear' : 'Actualizar'}
      cancelText="Cancelar"
      width={600}
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          name="name"
          label="Nombre del Departamento"
          rules={[
            { required: true, message: 'El nombre es requerido' },
            { max: 45, message: 'Máximo 45 caracteres' },
          ]}
        >
          <Input placeholder="Ej: Recursos Humanos" />
        </Form.Item>

        <Form.Item name="parent_id" label="Departamento Padre">
          <TreeSelect
            treeData={treeData}
            placeholder="Seleccionar departamento padre (opcional)"
            allowClear
            showSearch
            treeDefaultExpandAll
            treeNodeFilterProp="title"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="level"
            label="Nivel"
            rules={[
              { required: true, message: 'El nivel es requerido' },
              { type: 'number', min: 1, message: 'Mínimo nivel 1' },
            ]}
          >
            <InputNumber
              placeholder="Ej: 1"
              min={1}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="employee_count"
            label="Cantidad de Empleados"
            rules={[
              { required: true, message: 'La cantidad es requerida' },
              { type: 'number', min: 0, message: 'Mínimo 0' },
            ]}
          >
            <InputNumber
              placeholder="Ej: 10"
              min={0}
              className="w-full"
            />
          </Form.Item>
        </div>

        <Form.Item name="ambassador_name" label="Nombre del Embajador">
          <Input placeholder="Ej: Juan Pérez (opcional)" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

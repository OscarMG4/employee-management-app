import { Modal, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import type { Employee, EmployeeFormData } from '../../types/employee';

interface EmployeeModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  employee?: Employee;
  departments: string[];
  positions: string[];
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function EmployeeModal({
  open,
  mode,
  employee,
  departments,
  positions,
  onSubmit,
  onCancel,
  loading,
}: EmployeeModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && mode === 'edit' && employee) {
      form.setFieldsValue({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        salary: employee.salary,
        hire_date: employee.hire_date ? dayjs(employee.hire_date) : null,
        department: employee.department,
        status: employee.status,
        address: employee.address,
        notes: employee.notes,
      });
    } else if (open && mode === 'create') {
      form.resetFields();
    }
  }, [open, mode, employee, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        hire_date: values.hire_date ? values.hire_date.format('YYYY-MM-DD') : undefined,
      };
      onSubmit(formattedValues);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={mode === 'create' ? 'Crear Colaborador' : 'Editar Colaborador'}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText={mode === 'create' ? 'Crear' : 'Actualizar'}
      cancelText="Cancelar"
      width={700}
    >
      <Form form={form} layout="vertical" className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="first_name"
            label="Nombre"
            rules={[
              { required: true, message: 'El nombre es requerido' },
              { max: 50, message: 'Máximo 50 caracteres' },
            ]}
          >
            <Input placeholder="Ej: Juan" />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Apellido"
            rules={[
              { required: true, message: 'El apellido es requerido' },
              { max: 50, message: 'Máximo 50 caracteres' },
            ]}
          >
            <Input placeholder="Ej: Pérez" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="email"
            label="Correo Electrónico"
            rules={[
              { required: true, message: 'El correo es requerido' },
              { type: 'email', message: 'Correo inválido' },
              { max: 100, message: 'Máximo 100 caracteres' },
            ]}
          >
            <Input placeholder="ejemplo@empresa.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Teléfono"
            rules={[{ max: 20, message: 'Máximo 20 caracteres' }]}
          >
            <Input placeholder="Ej: +51 999 999 999" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="department"
            label="Departamento"
            rules={[{ required: true, message: 'El departamento es requerido' }]}
          >
            <Select
              placeholder="Seleccionar departamento"
              showSearch
              allowClear
              options={departments.map((d) => ({ label: d, value: d }))}
            />
          </Form.Item>

          <Form.Item
            name="position"
            label="Cargo"
            rules={[{ required: true, message: 'El cargo es requerido' }]}
          >
            <Select
              placeholder="Seleccionar cargo"
              showSearch
              allowClear
              options={positions.map((p) => ({ label: p, value: p }))}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="salary"
            label="Salario"
            rules={[
              { required: true, message: 'El salario es requerido' },
              { type: 'number', min: 0, message: 'Debe ser mayor a 0' },
            ]}
          >
            <InputNumber
              placeholder="Ej: 3000"
              min={0}
              step={100}
              className="w-full"
              formatter={(value) =>
                `S/ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => (value ? Number(value.replace(/S\/\s?|(,*)/g, '')) : 0) as 0}
            />
          </Form.Item>

          <Form.Item
            name="hire_date"
            label="Fecha de Ingreso"
            rules={[{ required: true, message: 'La fecha es requerida' }]}
          >
            <DatePicker
              placeholder="Seleccionar fecha"
              format="DD/MM/YYYY"
              className="w-full"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="status"
          label="Estado"
          rules={[{ required: true, message: 'El estado es requerido' }]}
          initialValue="active"
        >
          <Select
            options={[
              { label: 'Activo', value: 'active' },
              { label: 'Inactivo', value: 'inactive' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Dirección"
          rules={[{ max: 255, message: 'Máximo 255 caracteres' }]}
        >
          <Input placeholder="Ej: Av. Principal 123, Lima" />
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notas"
        >
          <Input.TextArea
            placeholder="Notas adicionales (opcional)"
            rows={3}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

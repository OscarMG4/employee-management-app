import { z } from 'zod';

export const employeeSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(255, 'El nombre no puede exceder 255 caracteres'),
  
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Debe ser un email válido')
    .max(255, 'El email no puede exceder 255 caracteres'),
  
  position: z
    .string()
    .min(1, 'La posición es requerida')
    .max(255, 'La posición no puede exceder 255 caracteres'),
  
  salary: z
    .union([z.string(), z.number()])
    .refine((val) => {
      const num = typeof val === 'string' ? parseFloat(val) : val;
      return !isNaN(num) && num >= 0 && num <= 999999.99;
    }, 'El salario debe ser un número entre 0 y 999,999.99'),
  
  hire_date: z
    .string()
    .min(1, 'La fecha de contratación es requerida')
    .refine((date) => {
      const hireDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return hireDate <= today;
    }, 'La fecha de contratación no puede ser futura'),
  
  department: z
    .string()
    .min(1, 'El departamento es requerido')
    .max(255, 'El departamento no puede exceder 255 caracteres'),
  
  status: z
    .enum(['active', 'inactive'], {
      message: 'El estado debe ser activo o inactivo',
    })
    .optional()
    .default('active'),
  
  notes: z
    .string()
    .max(1000, 'Las notas no pueden exceder 1000 caracteres')
    .optional()
    .or(z.literal('')),
});

export type EmployeeSchemaType = z.infer<typeof employeeSchema>;

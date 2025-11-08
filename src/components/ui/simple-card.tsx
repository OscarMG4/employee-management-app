import { Card } from 'antd';
import type { CardProps } from 'antd';
import type { ReactNode } from 'react';

interface SimpleCardProps extends CardProps {
  children: ReactNode;
}

export const SimpleCard = ({ children, ...props }: SimpleCardProps) => {
  return (
    <Card
      bordered={false}
      style={{
        marginBottom: 16,
        borderRadius: 8,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        ...props.style
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

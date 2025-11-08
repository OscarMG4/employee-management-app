import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onNew?: () => void;
  extra?: ReactNode;
  newButtonText?: string;
  showNewButton?: boolean;
}

export const PageHeader = ({ 
  title,
  subtitle,
  onNew, 
  extra, 
  newButtonText = 'Nuevo',
  showNewButton = true 
}: PageHeaderProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: 24,
      padding: '0 4px'
    }}>
      <div>
        <h1 style={{ 
          margin: 0, 
          fontSize: 24, 
          fontWeight: 600,
          color: '#262626'
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ 
            margin: '4px 0 0 0', 
            fontSize: 14, 
            color: '#8c8c8c'
          }}>
            {subtitle}
          </p>
        )}
      </div>
      <Space>
        {extra}
        {showNewButton && onNew && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={onNew}
            size="large"
          >
            {newButtonText}
          </Button>
        )}
      </Space>
    </div>
  );
};

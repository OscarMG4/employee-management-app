import { Layout, Menu, Badge, Avatar, Dropdown } from 'antd';
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header } = Layout;

export function Navbar() {
  const menuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
    },
    {
      key: 'organization',
      label: 'Organización',
    },
    {
      key: 'models',
      label: 'Modelos',
    },
    {
      key: 'tracking',
      label: 'Seguimiento',
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Perfil',
    },
    {
      key: 'settings',
      label: 'Configuración',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Cerrar sesión',
    },
  ];

  return (
    <Header
      style={{
        background: '#1890ff',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            width: 32,
            height: 32,
            background: '#fff',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#1890ff',
          }}
        >
          X
        </div>

        <Menu
          mode="horizontal"
          items={menuItems}
          selectedKeys={['organization']}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            minWidth: 400,
          }}
          theme="dark"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Badge count={0} showZero={false}>
          <ShoppingCartOutlined
            style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }}
          />
        </Badge>

        <Badge count={0} showZero={false}>
          <BellOutlined
            style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }}
          />
        </Badge>

        <Badge count={1} dot>
          <BellOutlined
            style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }}
          />
        </Badge>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Avatar
            style={{
              backgroundColor: '#ff7875',
              cursor: 'pointer',
            }}
            icon={<UserOutlined />}
          >
            A
          </Avatar>
        </Dropdown>

        <span style={{ color: '#fff', fontSize: 14 }}>Administrador</span>
      </div>
    </Header>
  );
}

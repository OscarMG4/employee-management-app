import { Button, Checkbox, Space } from 'antd';

type FilterValue = string | number;

interface FilterDropdownProps {
  options: FilterValue[];
  selectedKeys: FilterValue[];
  setSelectedKeys: (keys: FilterValue[]) => void;
  confirm: () => void;
  clearFilters?: () => void;
  renderLabel?: (value: FilterValue) => string;
}

export function FilterDropdown({
  options,
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
  renderLabel = (value) => String(value),
}: FilterDropdownProps) {
  return (
    <div style={{ padding: 8, minWidth: 200, maxHeight: 300, overflow: 'auto' }}>
      <Checkbox.Group
        style={{ display: 'flex', flexDirection: 'column' }}
        value={selectedKeys}
        onChange={(checkedValues) => {
          setSelectedKeys(checkedValues);
        }}
      >
        {options.map((option) => (
          <Checkbox 
            key={String(option)} 
            value={option} 
            style={{ marginBottom: 4 }}
          >
            {renderLabel(option)}
          </Checkbox>
        ))}
      </Checkbox.Group>
      
      <Space style={{ marginTop: 8, borderTop: '1px solid #f0f0f0', paddingTop: 8 }}>
        <Button
          type="primary"
          size="small"
          onClick={confirm}
        >
          Filtrar
        </Button>
        <Button
          size="small"
          onClick={() => {
            clearFilters?.();
            confirm();
          }}
        >
          Limpiar
        </Button>
      </Space>
    </div>
  );
}

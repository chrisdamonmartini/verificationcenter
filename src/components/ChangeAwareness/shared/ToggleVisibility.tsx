import React from 'react';
import { Space, Tag, Typography } from 'antd';
import useColors from '../../../hooks/useColors';
import useCategoryConfigurations from './TableConfigurations';

const { Text } = Typography;

interface ToggleVisibilityProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

/**
 * ToggleVisibility component
 * Provides category filter toggles that use the standardized color palette
 */
const ToggleVisibility: React.FC<ToggleVisibilityProps> = ({
  selectedCategories,
  onToggleCategory
}) => {
  const colors = useColors();
  const categoryConfigs = useCategoryConfigurations();
  
  // Filter to commonly used categories
  const categories = [
    {
      id: 'requirement',
      name: 'Requirements',
      color: colors.category.requirements,
    },
    {
      id: 'function',
      name: 'Functions',
      color: colors.category.functions,
    },
    {
      id: 'logical',
      name: 'Logical',
      color: colors.chart.series4,
    },
    {
      id: 'cad',
      name: 'CAD',
      color: colors.category.cad,
    },
    {
      id: 'bom',
      name: 'BOM',
      color: colors.category.bom,
    }
  ];
  
  return (
    <Space direction="vertical" size="small" style={{ width: '100%' }}>
      <Text type="secondary" style={{ fontSize: '12px' }}>Toggle Visibility:</Text>
      <Space wrap>
        {categories.map(category => {
          const isSelected = selectedCategories.includes(category.id);
          
          return (
            <Tag
              key={category.id}
              onClick={() => onToggleCategory(category.id)}
              style={{
                cursor: 'pointer',
                backgroundColor: isSelected ? `${category.color}15` : colors.ui.disabled,
                color: isSelected ? category.color : colors.text.secondary,
                borderColor: isSelected ? category.color : colors.ui.border,
                padding: '4px 8px',
                transition: 'all 0.3s',
              }}
            >
              {category.name}
            </Tag>
          );
        })}
      </Space>
    </Space>
  );
};

export default ToggleVisibility; 
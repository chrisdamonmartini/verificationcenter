import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Space, Tag, Tooltip, Badge, Empty, Spin } from 'antd';
import { 
  SyncOutlined, 
  InfoCircleOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';
import { useTeamcenter } from '../../context/TeamcenterContext';
import { useProduct } from '../../context/ProductContext';
import type { TCRequirement } from '../../data/teamcenter';
import { syncTeamcenterData } from '../../data/teamcenter';
import type { ColumnsType } from 'antd/es/table';

const TeamcenterRequirementsPreview: React.FC = () => {
  const { productType } = useProduct();
  const { connectionStatus, isAuthenticated } = useTeamcenter();
  
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState<TCRequirement[]>([]);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  // Columns for the requirements table
  const columns: ColumnsType<TCRequirement> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      render: (text) => <code>{text}</code>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          <Tooltip title={record.description}>
            <InfoCircleOutlined style={{ color: '#1890ff' }} />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Rev',
      dataIndex: 'revision',
      key: 'revision',
      width: 70,
      render: (text) => <code>{text}</code>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (status) => {
        let color = 'default';
        if (status === 'Released') color = 'success';
        if (status === 'In Progress') color = 'processing';
        if (status === 'Draft') color = 'default';
        return <Badge status={color as any} text={status} />;
      },
    },
    {
      title: 'Verification',
      dataIndex: 'attributes',
      key: 'verification',
      width: 130,
      render: (attributes) => {
        const status = attributes.verification_status as string;
        let color = 'default';
        if (status === 'Verified') color = 'success';
        if (status === 'In Progress') color = 'processing';
        if (status === 'Not Started') color = 'default';
        if (status === 'Failed') color = 'error';
        return <Badge status={color as any} text={status} />;
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: 200,
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'Critical') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  // Function to fetch requirements from Teamcenter
  const fetchRequirements = async () => {
    if (!isAuthenticated || connectionStatus !== 'connected') {
      return;
    }

    setLoading(true);
    try {
      const result = await syncTeamcenterData(productType);
      if (result.success && result.data) {
        setRequirements(result.data);
        setLastSynced(new Date());
      }
    } catch (error) {
      console.error('Error fetching requirements:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch requirements on initial load and when authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchRequirements();
    } else {
      setRequirements([]);
    }
  }, [isAuthenticated, productType]);

  if (!isAuthenticated || connectionStatus !== 'connected') {
    return (
      <Card 
        title={
          <Space>
            <FileTextOutlined />
            <span>Teamcenter Requirements</span>
          </Space>
        }
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Space direction="vertical" align="center">
              <span>Not connected to Teamcenter</span>
              <span style={{ fontSize: '0.8rem', color: '#999' }}>
                Connect to Teamcenter in the settings to view requirements
              </span>
            </Space>
          }
        />
      </Card>
    );
  }

  return (
    <Card 
      title={
        <Space>
          <FileTextOutlined />
          <span>Teamcenter Requirements</span>
        </Space>
      }
      extra={
        <Space>
          {lastSynced && (
            <span style={{ fontSize: '0.8rem' }}>
              Last synced: {lastSynced.toLocaleString()}
            </span>
          )}
          <Button 
            type="primary" 
            icon={<SyncOutlined />} 
            onClick={fetchRequirements}
            loading={loading}
          >
            Sync
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading}>
        {requirements.length > 0 ? (
          <Table 
            columns={columns} 
            dataSource={requirements}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            size="small"
          />
        ) : (
          <Empty 
            description={
              <Space direction="vertical" align="center">
                <span>No requirements synced from Teamcenter</span>
                <Button 
                  type="primary" 
                  icon={<SyncOutlined />} 
                  onClick={fetchRequirements}
                  loading={loading}
                >
                  Sync Requirements
                </Button>
              </Space>
            }
          />
        )}
      </Spin>
    </Card>
  );
};

export default TeamcenterRequirementsPreview; 
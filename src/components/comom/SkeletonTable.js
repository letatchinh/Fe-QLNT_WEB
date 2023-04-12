import React from 'react';
import { Table, Skeleton } from 'antd';

const SkeletonTable = ({
  columns,
  rowCount,
  showHeader = true,
  pagination,
  style
}) => {
  return (
    <Table
      style={style}
      size="middle"
      rowKey="key"
      pagination={pagination}
      showHeader={showHeader}
      className="skeleton-table"
      dataSource={[...Array(rowCount || 3)].map((_, index) => ({
        key: `key${index}`
      }))}
      columns={columns.map((column) => {
        return {
          ...column,
          render: function renderPlaceholder() {
            return (
              <Skeleton key={column.dataIndex} title={true} paragraph={false} />
            );
          }
        };
      })}
    />
  );
};

export default SkeletonTable;

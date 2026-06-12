import { Button, Checkbox, Popconfirm, Table, type TableProps } from 'antd';
import type { TodoItem } from '../../Entities/TodoItem/TodoItem';
import React, { useEffect, useState } from 'react';
import { EditableRow } from '../EditableRow/EditableRow';
import { EditableCell } from '../EditableCell/EditableCell';
import { initialData } from './config/config';

type ColumnTypes = Exclude<TableProps<TodoItem>['columns'], undefined>;

const storageData = localStorage.getItem('TodoTableData');
const data = storageData ? JSON.parse(storageData || '') : null;

export const TodoTable = () => {
  const [dataSource, setDataSource] = useState<TodoItem[]>(data || initialData);
  const [count, setCount] = useState(dataSource.length + 1);

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'isDone',
      dataIndex: 'isDone',
      key: 'isDone',
      render: (_, record) => (
        <Checkbox
          checked={record.isDone}
          onChange={() => {
            const newData = dataSource.map((item) =>
              item.id === record.id ? { ...item, isDone: !item.isDone } : item,
            );
            setDataSource(newData);
          }}
        />
      ),
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (row: TodoItem) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TodoItem) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const handleAdd = () => {
    const newData: TodoItem = {
      id: count,
      category: 'newCategory',
      description: 'newDescription',
      isDone: false,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleDelete = (id: React.Key) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
  };

  useEffect(() => {
    localStorage.setItem('TodoTableData', JSON.stringify(dataSource));
  }, [dataSource]);

  return (
    <>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        rowKey="id"
      />
    </>
  );
};

import {
  Button,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Table,
  type FormInstance,
  type InputRef,
  type TableColumnsType,
} from 'antd';
import type { TodoItem } from '../../Entities/TodoItem/TodoItem';
import React, { useContext, useEffect, useRef, useState } from 'react';

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof TodoItem;
  record: TodoItem;
  handleSave: (record: TodoItem) => void;
}

export const TodoTable = () => {
  const EditableContext = React.createContext<FormInstance<any> | null>(null);

  const handleDelete = (id: React.Key) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
  };

  const [dataSource, setDataSource] = useState<TodoItem[]>([
    {
      id: 1,
      category: 'daily',
      description: '10000 steps',
      isDone: true,
    },
    {
      id: 2,
      category: 'daily',
      description: '100g proteins',
      isDone: false,
    },
  ]);
  const [count, setCount] = useState(dataSource.length + 1);

  const columns: TableColumnsType = [
    {
      title: 'isDone',
      dataIndex: 'isDone',
      key: 'isDone',
      render: (text) => <Checkbox>{text}</Checkbox>,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
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

  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();

        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingInlineEnd: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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
        columns={columns}
        rowKey="id"
      />
    </>
  );
};

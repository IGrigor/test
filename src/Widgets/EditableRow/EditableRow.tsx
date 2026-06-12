import { Form } from 'antd';
import React from 'react';
import { EditableContext } from './context';

export const EditableRow: React.FC = ({ ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

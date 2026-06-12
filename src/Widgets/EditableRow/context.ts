import React from 'react';
import type { Form, GetRef } from 'antd';
import type { TodoItem } from '../../Entities/TodoItem/TodoItem';

type FormInstance<T> = GetRef<typeof Form<T>>;

export const EditableContext =
  React.createContext<FormInstance<TodoItem> | null>(null);

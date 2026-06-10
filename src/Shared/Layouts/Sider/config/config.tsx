import type { MenuProps } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

export const items: MenuItem[] = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: <Link to={'/'}>Aims</Link>,
    children: [
      { key: '2', label: <Link to={'/daily'}>Daily</Link> },
      { key: '3', label: <Link to={'/studying'}>Studying</Link> },
      { key: '4', label: <Link to={'/training'}>Training</Link> },
    ],
  },
];

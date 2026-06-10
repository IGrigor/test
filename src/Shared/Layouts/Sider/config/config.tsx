import type { MenuProps } from "antd";
import { PieChartOutlined } from '@ant-design/icons';
<<<<<<< HEAD
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

export const items: MenuItem[] = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: (<Link to={'/'}>Aims</Link>),
    children: [
      { key: '2', label: (<Link to={'/daily'}>Daily</Link>) },
      { key: '3', label: (<Link to={'/studying'}>Studying</Link>) },
      { key: '4', label: (<Link to={'/training'}>Training</Link>) },
    ],
  },
=======

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItem('Aims', 'sub1', <PieChartOutlined />, [
    getItem('Daily', '3'),
    getItem('Studying', '4'),
    getItem('Training', '5'),
  ])
>>>>>>> 77a2d72f9de683f382257cab417fe27b6cbac5bb
];
import type { MenuProps } from "antd";
import { PieChartOutlined } from '@ant-design/icons';

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
];
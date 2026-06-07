import { Layout, Menu } from "antd"
import styles from './Sider.module.scss'
import { useState } from "react";
import { items } from "./config/config";

const { Sider: AntSider } = Layout;

export const Sider = () => {
    const [collapsed, setCollapsed] = useState(false);
      return (
        <AntSider className={styles.sider} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </AntSider>
      )
}
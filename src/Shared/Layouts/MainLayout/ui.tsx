import { Layout } from 'antd';
import styles from './MainLayout.module.scss';
import { Sider } from '../Sider';
import { Outlet } from 'react-router-dom';
const { Header, Footer, Content } = Layout;

export const MainLayout = () => {
  return (
    <Layout className={styles.layout}>
      <Sider />
      <Layout>
        <Header className={styles.header}>AimTracker</Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Footer className={styles.footer}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

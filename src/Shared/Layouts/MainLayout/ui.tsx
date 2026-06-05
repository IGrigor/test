import { Layout } from "antd"
import styles from './MainLayout.module.scss'
import type { PropsWithChildren } from "react"
import { Sider } from "../Sider";
const { Header, Footer, Content } = Layout;

export const MainLayout = ({children}: PropsWithChildren) => {
    return <Layout className={styles.layout}>
      <Sider/>
      <Layout>
        <Header className={styles.header}>AimTracker</Header>
        <Content className={styles.content}>{children}</Content>
        <Footer className={styles.footer}>Footer</Footer>
      </Layout>
    </Layout>
}
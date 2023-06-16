import { FC } from "react";
import { Layout } from "antd";
import { ILayout } from "../../common/interfaces";
import AppHeader from "../../components/header";
import AppFooter from "../../components/footer";

const { Content } = Layout;

const CommenLayout: FC<ILayout> = ({ children }) => {
  return (
    <Layout>
      <AppHeader header="Google place finder" />
      <Content className="app-content">
        <div className="main-container">{children}</div>
      </Content>
      <AppFooter footer="Map data ©2023 Google - Ishanka sample project" />
    </Layout>
  );
};

export default CommenLayout;

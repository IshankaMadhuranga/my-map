import { FC, CSSProperties } from "react";
import { Layout } from "antd";
import { ILayout } from "../../common/interfaces";
import AppHeader from "../../components/header";
import AppFooter from "../../components/footer";

const { Content } = Layout;

const contentStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const CommenLayout: FC<ILayout> = ({ children }) => {
  return (
    <Layout style={{ margin: 0 }}>
      <AppHeader header="App Header" />
      <Content style={contentStyle}>
        <div style={{ height: "calc(100vh - 9rem)" }}>{children}</div>
      </Content>
      <AppFooter footer="Footer" />
    </Layout>
  );
};

export default CommenLayout;

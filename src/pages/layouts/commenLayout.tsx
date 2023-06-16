import React, { FC, CSSProperties } from "react";
import { Layout } from "antd";
import { ILayout } from "../../common/interfaces";

const { Header, Footer, Content } = Layout;

const headerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "5rem",
  backgroundColor: "#7dbcea",
};

const contentStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const footerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "4rem",
  backgroundColor: "#7dbcea",
};

const CommenLayout: FC<ILayout> = ({ children }) => {
  return (
    <Layout style={{ margin: 0 }}>
      <Header style={headerStyle}>
        <div></div>
      </Header>
      <Content style={contentStyle}>
        <div style={{ height: "calc(100vh - 9rem)" }}>{children}</div>
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};

export default CommenLayout;

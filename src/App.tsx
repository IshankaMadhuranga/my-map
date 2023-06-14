import React, { useMemo, useState, useRef } from "react";
import { Layout, Input } from "antd";
import {
  GoogleMap,
  Marker,
  LoadScript,
  useLoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import MapWithSearchBox from "./MapWithSearch";

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "5rem",
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "4rem",
  backgroundColor: "#7dbcea",
};

function App() {
  return (
    <Layout style={{ margin: 0 }}>
      <Header style={headerStyle}>
        <div id="searchColumn">{/*<h2>Tide Forecast Options</h2>*/}</div>
      </Header>
      <Content style={contentStyle}>
        <div style={{ height: "calc(100vh - 9rem)" }}>
          <MapWithSearchBox />
        </div>
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
}

export default App;

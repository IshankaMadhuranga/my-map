import React, { FC, CSSProperties } from "react";
import { Header } from "antd/es/layout/layout";
import { IHeader } from "../../common/interfaces/components";

const headerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "5rem",
  backgroundColor: "#7dbcea",
};

const AppHeader: FC<IHeader> = ({ header }) => {
  return (
    <Header style={headerStyle}>
      <h2>{header}</h2>
    </Header>
  );
};

export default AppHeader;
